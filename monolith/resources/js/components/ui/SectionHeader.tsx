import type { ReactNode } from 'react'

export type SectionHeaderProps = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  badge?: string
}

const SectionHeader = ({ eyebrow, title, description, badge }: SectionHeaderProps) => (
  <div className="relative mx-auto max-w-3xl text-center">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-br from-emerald-500/20 via-slate-900/0 to-transparent blur-3xl"
    />
    <div className="relative rounded-[2rem] bg-white/90 p-6 shadow-[0_20px_45px_rgba(15,45,25,0.15)] backdrop-blur">
      {eyebrow && (
        <div className="flex items-center justify-center gap-4 text-[0.65rem] uppercase tracking-[0.35em] text-emerald-600">
          <span className="h-px w-16 bg-gradient-to-r from-emerald-500 to-transparent" />
          <span>{eyebrow}</span>
          <span className="h-px w-16 bg-gradient-to-l from-emerald-500 to-transparent" />
        </div>
      )}
      <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-3 text-base text-slate-500">{description}</p>}
      {badge && (
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-emerald-800">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-800" />
          {badge}
        </div>
      )}
    </div>
  </div>
)

export default SectionHeader
