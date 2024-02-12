import React, { Suspense } from 'react'
import Link from 'next/link'
import SidebarNoteList from './SidebarNoteList'
import NoteListSkeleton from './NoteListSkeleton'
import EditButton from '@/components/EditButton'

import { getAllNotes } from '@/lib/redis'

export default async function Sidebar() {
  const notes = await getAllNotes()
  return (
    <>
      <section className="col sidebar">
        <Link href="/" className="link--unstyled">
          <section className="sidebar-header">
            <img
              className="logo"
              src="/logo.svg"
              width="22px"
              height="20px"
              alt=""
              role="presentation"
            />
            <strong>React Notes</strong>
          </section>
        </Link>
        <section className="sidebar-menu" role="menubar">
          {/* SideSearchField */}
          <EditButton noteId={null}>New</EditButton>
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList notes={notes} />
          </Suspense>
        </nav>
      </section>
    </>
  )
}
