import React, { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import SidebarNoteList from './SidebarNoteList'
import NoteListSkeleton from './NoteListSkeleton'
import EditButton from '@/components/EditButton'
import SidebarSearchField from '@/components/SidebarSearchField'

export default function Sidebar() {
  const t = useTranslations('Basic')

  return (
    <>
      <section className="col sidebar">
        <Link href="/" className="link--unstyled">
          <section className="sidebar-header">
            <Image
              className="logo"
              src="/logo.svg"
              width={22}
              height={20}
              alt=""
              role="presentation"
            />
            <strong>React Notes</strong>
          </section>
        </Link>
        <section className="sidebar-menu" role="menubar">
          <SidebarSearchField search={t('search')} />
          {/* <EditButton noteId={null}>New</EditButton> */}
          <EditButton noteId={null}>{t('new')}</EditButton>

        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList />
          </Suspense>
        </nav>
      </section>
    </>
  )
}
