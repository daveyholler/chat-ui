import { SourceItem, SourceType } from "./source_item"

export default ({ sources }: { sources: SourceType[]}) => {
  return sources.length > 0 && (
      <>
        <h5 className="text-sm font-bold tracking-wide leading-normal text-gray-900 uppercase mb-2">
          Sources
        </h5>
        <div className="flex space-x-2">
          {sources.map((source) => (
            <SourceItem
              name={source.name}
              icon={source.icon}
              href={source.href}
            />
          ))}
        </div>
      </>
    ) || null
}