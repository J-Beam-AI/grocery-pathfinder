interface OtherItemsScreenProps {
  otherNames: string[]
  onRemove: (name: string) => void
  onBack: () => void
}

export function OtherItemsScreen({ otherNames, onRemove, onBack }: OtherItemsScreenProps) {
  return (
    <div className="max-w-lg mx-auto px-4 pt-4 pb-8">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-blue-500 dark:text-blue-400 min-h-[44px] mb-2"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back
      </button>
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Other Items</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Items in this list skip the aisle resolver automatically on every trip.
          Delete an item to start prompting for its aisle again.
        </p>
      </div>

      {otherNames.length === 0 ? (
        <div className="text-center py-16 text-gray-400 dark:text-gray-500">
          <svg className="mx-auto mb-3 opacity-40" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
            <rect x="9" y="3" width="6" height="4" rx="1" />
          </svg>
          <p className="text-sm">No other items yet.</p>
          <p className="text-xs mt-1">Items you skip during shopping will appear here permanently.</p>
        </div>
      ) : (
        <ul className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {otherNames.map(name => (
            <li
              key={name}
              className="flex items-center gap-3 px-4 min-h-[52px]
                         border-b border-gray-100 dark:border-gray-800 last:border-0
                         bg-white dark:bg-gray-950"
            >
              <span className="flex-1 text-base text-gray-900 dark:text-gray-100 capitalize">
                {name}
              </span>
              <button
                onClick={() => onRemove(name)}
                aria-label={`Remove ${name} from other items`}
                className="flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center
                           text-gray-400 dark:text-gray-500
                           active:text-red-500 dark:active:text-red-400 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6M14 11v6" />
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
