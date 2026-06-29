import { en } from '@/lib/i18n/translations/en'
import { ar } from '@/lib/i18n/translations/ar'
import { getProject, getProjects } from '@/lib/cms/content'

export type Project = {
    id: string
    category: string
    relatedServiceSlugs?: string[]
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

const translations: Record<string, any> = { en, ar }

export function getStaticProjects(locale: string): Project[] {
    const t = translations[locale] || translations.en
    const projects = (t?.projects?.projectCards as Project[]) || []
    return projects.map((p) => ({ relatedServiceSlugs: [], ...p }))
}

export async function getAllProjects(locale: string): Promise<Project[]> {
    return getProjects(locale)
}

export async function getProjectById(id: string, locale: string): Promise<Project | null> {
    return getProject(locale, id)
}

export function getAllProjectIds(): string[] {
    const enProjects = getStaticProjects('en')
    return enProjects.map((p) => p.id)
}

export async function getAllProjectIdsFromCMS(): Promise<string[]> {
    const projects = await getProjects('en')
    const ids = projects.map((project) => project.id).filter(Boolean)
    return ids.length > 0 ? ids : getAllProjectIds()
}
