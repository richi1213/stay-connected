import { getTags } from '@/components/api/tags/index.ts';
import { useQuery } from '@tanstack/react-query';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tags } from '@/types/types.ts';
import { useNavigate, useSearchParams } from 'react-router-dom';

const TagSelector = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const search = searchParams.get('search') || '';
  const selectedTags = searchParams.getAll('tags');

  const { data: tags } = useQuery({
    queryKey: ['getTagsList'],
    queryFn: getTags,
  });

  const handleTags = (value: string[]) => {
    const newSearchParams = new URLSearchParams();

    if (search.trim()) {
      newSearchParams.set('search', search.trim());
    }
    value.forEach((tag) => newSearchParams.append('tags', tag)); // Properly append each tag

    navigate(`/?${newSearchParams.toString()}`);
  };

  return (
    <div className='flex gap-2'>
      {tags && (
        <div className='flex gap-4'>
          <ToggleGroup
            variant='outline'
            type='multiple'
            size='sm'
            value={selectedTags}
            onValueChange={handleTags}
          >
            {tags.map((tag: Tags) => {
              return (
                <ToggleGroupItem
                  value={tag.slug}
                  key={tag.id}
                  className='hover:bg-gray-100 data-[state=on]:bg-primary data-[state=on]:text-white'
                >
                  {tag.name}
                </ToggleGroupItem>
              );
            })}
          </ToggleGroup>
        </div>
      )}
    </div>
  );
};

export default TagSelector;
