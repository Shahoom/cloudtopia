import { en } from '@/lib/i18n/translations/en'
import { ar } from '@/lib/i18n/translations/ar'
import { tr } from '@/lib/i18n/translations/tr'

export type Project = {
    id: string
    category: string
    type: string
    featured: boolean
    title: string
    problem: string
    solution: string
    features: string[]
    image: string
    metrics: { label: string; value: string }
    link?: string
}

const translations: Record<string, any> = { en, ar, tr }

export function getAllProjects(locale: string): Project[] {
    const t = translations[locale] || translations.en
    const projects = (t?.projects?.projectCards as Project[]) || []
    return projects
}

export function getProjectById(id: string, locale: string): Project | null {
    const projects = getAllProjects(locale)
    return projects.find((p) => p.id === id) || null
}

export function getAllProjectIds(): string[] {
    const enProjects = getAllProjects('en')
    return enProjects.map((p) => p.id)
}
