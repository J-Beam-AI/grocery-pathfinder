import { useState, useEffect } from 'react'
import { StoreSelector } from './StoreSelector'

const DRAFT_KEY = 'list-draft'

interface ListInputProps {
  activeStoreId: string
  onSwitchStore: (storeId: string) => void
  onGenerate: (rawText: string) => void
  onClear?: () => void
}

export function ListInput({ activeStoreId, onSwitchStore, onGenerate, onClear }: ListInputProps) {
  const [rawText, setRawText] = useState('')

  // Load saved draft after mount. useEffect guarantees this runs after iOS Safari
  // has fully initialized storage, avoiding the lazy-initializer timing issue where
  // the save effect fires with '' before the loaded value takes hold.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY)
      if (saved) setRawText(saved)
    } catch { }
  }, [])

  // Save inline in the change handler — never fires on mount, no race condition.
  function handleChange(text: string) {
    setRawText(text)
    try {
      localStorage.setItem(DRAFT_KEY, text)
    } catch { }
  }

  function handleClear() {
    setRawText('')
    onClear?.()
    try {
      localStorage.removeItem(DRAFT_KEY)
    } catch { }
  }

  const lineCount = rawText.split(/[\n,]+/).filter(l => l.trim()).length

  function handleSubmit() {
    if (lineCount === 0) return
    onGenerate(rawText)
  }

  return (
    <div className="max-w-lg mx-auto px-4 pt-6 pb-8 flex flex-col gap-4">
      {/* Store selector */}
      <StoreSelector activeStoreId={activeStoreId} onSelect={onSwitchStore} />

      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
          What do you need?
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">One item per line.</p>
      </div>

      {/* Textarea */}
      <div className="relative">
        <textarea
          value={rawText}
          onChange={e => handleChange(e.target.value)}
          placeholder={'milk\neggs\nbread\napples\n...'}
          rows={10}
          className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700
                     rounded-xl px-4 py-3 text-base text-gray-900 dark:text-gray-100
                     placeholder-gray-400 dark:placeholder-gray-600
                     focus:outline-none focus:border-blue-400 dark:focus:border-blue-500
                     resize-none"
        />
        {rawText.length > 0 && (
          <button
            onClick={handleClear}
            aria-label="Clear list"
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center
                       text-gray-400 dark:text-gray-500 rounded-full
                       active:bg-gray-100 dark:active:bg-gray-800"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Footer row: item count + submit button */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400 dark:text-gray-500">
          {lineCount > 0 ? `${lineCount} item${lineCount !== 1 ? 's' : ''}` : ''}
        </span>
        <button
          onClick={handleSubmit}
          disabled={lineCount === 0}
          className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white
                     rounded-xl font-medium text-sm transition-opacity
                     disabled:opacity-40 active:opacity-80"
        >
          Generate Route
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  )
}
