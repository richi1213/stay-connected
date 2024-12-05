import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <div>
      <Link to='/'>
        <h1 className='text-onSurface text-xl font-bold'>StayConnected</h1>
      </Link>
    </div>
  );
};
export default Logo;
