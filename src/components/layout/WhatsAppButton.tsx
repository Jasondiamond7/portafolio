import { WhatsAppIcon } from '@/components/ui/icons'
import { profile } from '@/content/profile'

/**
 * Floating contact shortcut, present on every route. Uses the site's own
 * palette (not WhatsApp's brand green) so it reads as part of the design
 * instead of a bolted-on widget.
 */
export function WhatsAppButton() {
  return (
    <a
      href={profile.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbeme por WhatsApp"
      title="Escríbeme por WhatsApp"
      className="group fixed right-6 bottom-6 z-50 flex h-14 items-center gap-2 overflow-hidden rounded-full bg-primary pl-3.5 text-white shadow-lg transition-all duration-300 hover:pr-5 hover:shadow-[0_0_24px_-4px_var(--color-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <WhatsAppIcon className="h-7 w-7 shrink-0 fill-white" />
      <span className="max-w-0 overflow-hidden text-sm font-medium whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-40 group-hover:opacity-100">
        Escríbeme por WhatsApp
      </span>
    </a>
  )
}
