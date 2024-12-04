import { getTags } from '@/components/api/tags/index.ts';
import { useQuery } from '@tanstack/react-query';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tags } from '../types/question.types.ts';
import { useNavigate, useSearchParams } from 'react-router-dom';

const TagSelector = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');
  const navigate = useNavigate();

  const { data: tags } = useQuery({
    queryKey: ['getTagsList'],
    queryFn: getTags,
  });

  const handleTags = (selectedTags: string[]) => {
    const tagsPath =
      selectedTags.length > 0 ? `tags=${selectedTags.join(',')}` : '';
    const queryString = [search ? `search=${search}` : '', tagsPath]
      .filter(Boolean)
      .join('&');

    navigate(`/?${queryString}`);
  };

  return (
    <>
      {tags ? (
        <ToggleGroup
          variant='outline'
          type='multiple'
          className='items-start justify-start gap-2'
          size='sm'
          onValueChange={handleTags}
        >
          {tags.map((tag: Tags) => (
            <ToggleGroupItem
              value={tag.slug}
              key={tag.id}
              className='hover:bg-primary hover:text-white data-[state=on]:bg-primary data-[state=on]:text-white'
            >
              {tag.name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      ) : (
        <div>not found</div>
      )}
    </>
  );
};

export default TagSelector;
