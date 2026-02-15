import { EditorPanel } from './EditorPanel'
import { ChartPreview } from './ChartPreview'

export function ChartEditor() {
  return (
    <div className="chart-editor">
      <EditorPanel />
      <ChartPreview />
    </div>
  )
}
