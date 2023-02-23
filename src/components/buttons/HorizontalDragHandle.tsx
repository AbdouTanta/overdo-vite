import { ArrowsUpDownIcon } from '@heroicons/react/24/outline';

function HorizontalDragHandle(props: any) {
  return (
    <div className="cursor-pointer" {...props}>
      <ArrowsUpDownIcon className="h-5 w-5 rounded-md p-0.5 opacity-50 hover:bg-slate-400" />
    </div>
  );
}

export default HorizontalDragHandle;
