'use client'

import { useState } from 'react'
import { saveOrder } from './actions'

type Link = {
  id: string
  title: string
  url: string
}

export default function SortableList({ initial }: { initial: Link[] }) {
  const [items, setItems] = useState<Link[]>(initial)
  const [saving, setSaving] = useState(false)

  function onDragStart(e: React.DragEvent, index: number) {
    e.dataTransfer.setData('text/plain', String(index))
  }

  function onDrop(e: React.DragEvent, toIndex: number) {
    const fromIndex = Number(e.dataTransfer.getData('text/plain'))
    if (fromIndex === toIndex) return

    const updated = [...items]
    const [moved] = updated.splice(fromIndex, 1)
    updated.splice(toIndex, 0, moved)
    setItems(updated)
  }

  async function persist() {
    setSaving(true)
    await saveOrder(items.map((i) => i.id))
    setSaving(false)
  }

  return (
    <>
      <ul>
        {items.map((item, i) => (
          <li
            key={item.id}
            draggable
            onDragStart={(e) => onDragStart(e, i)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop(e, i)}
            style={{
              padding: 8,
              marginBottom: 6,
              border: '1px solid #ccc',
              cursor: 'grab',
            }}
          >
            <strong>{item.title}</strong> — {item.url}
          </li>
        ))}
      </ul>

      <button onClick={persist} disabled={saving}>
        {saving ? 'Kaydediliyor…' : 'Sırayı Kaydet'}
      </button>
    </>
  )
}
