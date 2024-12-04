import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface EmptyStateProps{
    title: string;
    buttonTitle: string;
    to: string;
}
const EmptyState: React.FC<EmptyStateProps> = ({title, buttonTitle, to}) => {
    const navigate = useNavigate(); 
    const handleClick = () => {
        navigate(to);
    };
    return(
        <div className="flex flex-col gap-8 bg-gray-50 p-12 rounded-sm items-center">
            <h1 className="text-xl font-medium text-muted-foreground">{title}</h1>
            <Button  onClick={handleClick}>{buttonTitle}</Button>
        </div>
    )
}
export default EmptyState