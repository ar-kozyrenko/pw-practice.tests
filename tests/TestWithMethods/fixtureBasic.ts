import { PageManager } from "../../apps/conduit/ui/pages/PageManager"; 
import { test as base, expect } from '@playwright/test'

type PageWithManager = {
    pageManager: PageManager
}

// Расширяем базовый тест нашими фикстурами
export const test = base.extend<PageWithManager>({
    pageManager: async ({ page }, use) => {
        const pageManager = new PageManager(page)
        await use(pageManager)
    }
})

