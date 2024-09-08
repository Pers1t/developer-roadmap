import { getPercentage } from '../../helper/number';
import type { UserProgress } from '../TeamProgress/TeamProgressPage';

type DashboardProgressCardProps = {
  progress: UserProgress;
};

export function DashboardProgressCard(props: DashboardProgressCardProps) {
  const { progress } = props;
  const {
    resourceType,
    resourceId,
    resourceTitle,
    total: totalCount,
    done: doneCount,
    skipped: skippedCount,
    roadmapSlug,
    isCustomResource,
    updatedAt,
  } = progress;

  let url =
    resourceType === 'roadmap'
      ? `/${resourceId}`
      : `/best-practices/${resourceId}`;

  if (isCustomResource) {
    url = `/r/${roadmapSlug}`;
  }

  const totalMarked = doneCount + skippedCount;
  const progressPercentage = getPercentage(totalMarked, totalCount);

  return (
    <a
      href={url}
      key={resourceId}
      className="group relative flex w-full flex-col justify-between overflow-hidden text-left text-sm"
    >
      <h4 className="truncate font-medium text-gray-900 group-hover:text-gray-500">
        {resourceTitle}
      </h4>

      <div className="mt-1 flex items-center gap-2">
        <div className="h-1.5 w-full overflow-hidden rounded-md bg-black/10">
          <div
            className="h-full bg-black/20"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <span className="min-w-7 text-xs text-gray-500">
          {Math.floor(+progressPercentage)}%
        </span>
      </div>
    </a>
  );
}
