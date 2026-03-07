import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { StoreZone } from '../types'
import { useStore } from '../hooks/useStore'

// ── Sortable zone row ──────────────────────────────────────────────────────

interface ZoneRowProps {
  zone: StoreZone
  onEdit: (id: string, name: string) => void
  onDelete: (id: string) => void
}

function ZoneRow({ zone, onEdit, onDelete }: ZoneRowProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(zone.name)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: zone.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  function commitEdit() {
    const trimmed = draft.trim()
    if (trimmed && trimmed !== zone.name) onEdit(zone.id, trimmed)
    setEditing(false)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 mb-2 touch-none"
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder"
        className="flex-shrink-0 p-2 text-gray-400 dark:text-gray-500 cursor-grab active:cursor-grabbing touch-none"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2 4h12v1.5H2zm0 3h12v1.5H2zm0 3h12v1.5H2z" />
        </svg>
      </button>

      {/* Zone name / inline edit */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            autoFocus
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={e => {
              if (e.key === 'Enter') commitEdit()
              if (e.key === 'Escape') { setDraft(zone.name); setEditing(false) }
            }}
            className="w-full text-sm bg-gray-50 dark:bg-gray-700 border border-blue-400 rounded px-2 py-1 outline-none"
          />
        ) : (
          <button
            onClick={() => { setDraft(zone.name); setEditing(true) }}
            className="w-full text-left text-sm font-medium truncate min-h-[44px] flex items-center"
          >
            {zone.name}
          </button>
        )}
      </div>

      {/* Edit / Delete actions */}
      {!editing && (
        <div className="flex gap-1 flex-shrink-0">
          <button
            onClick={() => { setDraft(zone.name); setEditing(true) }}
            aria-label={`Edit ${zone.name}`}
            className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-blue-500 dark:text-blue-400 rounded"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(zone.id)}
            aria-label={`Delete ${zone.name}`}
            className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-red-500 dark:text-red-400 rounded"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14H6L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4h6v2" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

// ── Add zone form ──────────────────────────────────────────────────────────

interface AddZoneFormProps {
  onAdd: (name: string) => void
}

function AddZoneForm({ onAdd }: AddZoneFormProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')

  function submit() {
    const trimmed = name.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setName('')
    setOpen(false)
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full min-h-[44px] border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2 mt-1"
      >
        <span className="text-lg leading-none">+</span> Add zone
      </button>
    )
  }

  return (
    <div className="flex gap-2 mt-1">
      <input
        autoFocus
        placeholder="Zone name (e.g. A34 — Pharmacy)"
        value={name}
        onChange={e => setName(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') submit()
          if (e.key === 'Escape') { setName(''); setOpen(false) }
        }}
        className="flex-1 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 outline-none focus:border-blue-400"
      />
      <button
        onClick={submit}
        className="px-4 min-h-[44px] bg-blue-500 text-white text-sm font-medium rounded-lg"
      >
        Add
      </button>
      <button
        onClick={() => { setName(''); setOpen(false) }}
        className="px-3 min-h-[44px] text-gray-500 dark:text-gray-400 text-sm rounded-lg"
      >
        Cancel
      </button>
    </div>
  )
}

// ── StoreSetup ─────────────────────────────────────────────────────────────

interface StoreSetupProps {
  onBack: () => void
}

export function StoreSetup({ onBack }: StoreSetupProps) {
  const { store, addZone, updateZone, deleteZone, reorderZones, resetToDefault } = useStore()
  const [confirmReset, setConfirmReset] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 },
    })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const zones = [...store.zones].sort((a, b) => a.order - b.order)
    const oldIdx = zones.findIndex(z => z.id === active.id)
    const newIdx = zones.findIndex(z => z.id === over.id)
    reorderZones(arrayMove(zones, oldIdx, newIdx))
  }

  const sortedZones = [...store.zones].sort((a, b) => a.order - b.order)

  return (
    <div className="max-w-lg mx-auto px-4 pb-8">
      {/* Header */}
      <div className="flex items-center gap-2 py-4">
        <button
          onClick={onBack}
          className="min-h-[44px] px-2 -ml-2 text-sm font-medium text-blue-500 dark:text-blue-400"
        >
          ← Back
        </button>
        <div className="flex-1">
          <h2 className="text-lg font-bold">{store.name}</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">{store.zones.length} zones · drag to reorder</p>
        </div>
        <button
          onClick={() => setConfirmReset(true)}
          className="text-xs text-gray-400 dark:text-gray-500 underline min-h-[44px] px-2"
        >
          Reset
        </button>
      </div>

      {/* Reset confirmation */}
      {confirmReset && (
        <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700 rounded-lg text-sm">
          <p className="font-medium text-amber-800 dark:text-amber-200 mb-2">Reset all zones to the Walmart 4th Plain defaults?</p>
          <div className="flex gap-2">
            <button
              onClick={() => { resetToDefault(); setConfirmReset(false) }}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium"
            >
              Reset
            </button>
            <button
              onClick={() => setConfirmReset(false)}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 rounded-lg text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Zone list */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sortedZones.map(z => z.id)} strategy={verticalListSortingStrategy}>
          {sortedZones.map(zone => (
            <ZoneRow
              key={zone.id}
              zone={zone}
              onEdit={updateZone}
              onDelete={deleteZone}
            />
          ))}
        </SortableContext>
      </DndContext>

      {sortedZones.length === 0 && (
        <p className="text-center text-gray-400 dark:text-gray-500 py-8 text-sm">No zones yet. Add one below.</p>
      )}

      <AddZoneForm onAdd={addZone} />
    </div>
  )
}
