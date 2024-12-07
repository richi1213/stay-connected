import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SuccessMsg = () => {
  return (
    <div className='flex flex-col items-center space-y-2 p-4 text-foreground'>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Check className='size-16 text-primary' />
      </motion.div>

      <motion.h2
        className='text-2xl font-semibold tracking-tight'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        Your account has been created!
      </motion.h2>

      <motion.p
        className='text-muted-foreground'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        Please log in to continue
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.1 }}
      >
        <Link to='/login'>
          <Button className='mt-6 bg-primary px-8 font-medium' size='lg'>
            Log In
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default SuccessMsg;
