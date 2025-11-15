/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import { FormatQuote } from '@mui/icons-material';
import {
  Stack,
  Typography,
  styled,
  Container,
  Box,
  Avatar,
  Button,
  Modal,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import {
  FC, useContext, useEffect, useState,
} from 'react';
import { AuthContext } from '../components/Context/AuthContext';

const CustomTypeograph = styled(Typography)(({ theme }) => ({
  fontFamily: "'Cairo', sans-serif",
  paddingBottom: '0.8rem',
  position: 'relative',
  fontWeight: 'bold',
  marginBottom: '2rem',
  textAlign: 'center',
  '&::after': {
    content: "''",
    position: 'absolute',
    bottom: '0px',
    left: 'calc(50% - 3rem)',
    width: '6rem',
    height: '3px',
    backgroundColor: 'black',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '1.8rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.6rem',
  },
}));

const CustomBox = styled(Box)({
  width: '30rem',
  display: 'flex',
  alignItems: 'center',
  padding: '0.5rem 1.5rem 0.5rem 2.3rem',
  border: '1px solid rgba(0,0,0,0.07)',
  boxShadow: '0px 30px 60px rgba(27,75,102, 0.15)',
  borderRadius: '25px',
  marginBottom: '2rem',
});

interface IFeedback {
  nickname: string;
  message: string;
  createdAt: string;
}

const FeedbackCard: FC<{ feedback: IFeedback }> = ({ feedback }) => (
  <CustomBox>
    <Box sx={{ width: '80%', paddingRight: '3px' }}>
      <FormatQuote fontSize="large" sx={{ color: '#377ba1' }} />
      <Typography variant="subtitle1" fontWeight="bold">
        {feedback.message}
      </Typography>
      <Typography
        variant="h6"
        mt={0.6}
        fontWeight="bolder"
        fontFamily="'Cairo', sans-serif"
        color="#377ba1"
      >
        {feedback.nickname}
      </Typography>
    </Box>
    <Avatar
      sx={{
        margin: '0 auto',
        width: 60,
        height: 60,
        backgroundColor: '#377ba1',
      }}
      alt={feedback.nickname}
      src="http://www/image/none"
    />
  </CustomBox>
);

const AboutPage = () => {
  const [data, setData] = useState<Array<IFeedback> | null>();
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [newItem, setNewItem] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { userId, setUserId } = useContext(AuthContext);
  const handleOpen = () => {
    if (feedback && feedback !== '') setError(false);
    setOpen(true);
  };
  const handleClose = () => {
    if (feedback?.length) {
      axios.post('/api/v1/website/feedback', {
        message: feedback,
      });
      setNewItem(!newItem);
      setFeedback(null);
      setError(false);
      setOpen(false);
    } else {
      setError(true);
    }
  };

  const fetchFeedbacks = async () => {
    const response = await axios.get('/api/v1/website/feedback');
    setData(response.data.feedbacks);
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [newItem]);

  return (
    <>
      <Container>
        <Stack alignItems="center" p="3rem">
          <CustomTypeograph variant="h4">
            What our little friends say about us
          </CustomTypeograph>
        </Stack>
        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent="space-around"
          sx={{
            maxWidth: '100%',
            minHeight: '4.7rem',
          }}
        >
          {data
            && data.map(
              (feed, i) => (
                <FeedbackCard key={new Date().toString() + i} feedback={feed} />
              ),
            )}
        </Stack>
      </Container>
      {userId && (
        <Container sx={{ position: 'relative' }}>
          <Button
            sx={{
              display: 'block',
              fontWeight: 'bold',
              position: 'fixed',
              bottom: '4rem',
              right: '4rem',
              marginLeft: 'auto',
              backgroundColor: '#93c2dd',
              color: 'black',
              padding: '.3rem .5rem',
              zIndex: '1000',
              boxShadow: '5px 5px 20px rgb(36 70 90 / 56%)',
              '&:hover': {
                color: '#1B4B66',
              },
            }}
            onClick={handleOpen}
          >
            Add Feedback
          </Button>
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                borderRadius: '1rem',
                position: 'absolute' as const,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                width: { sm: '80%', md: '60%' },
                boxShadow: 24,
                p: 4,
                paddingBottom: '1rem',
                display: 'flex',
                flexDirection: 'column',
                border: error || feedback === '' ? '2px solid red' : '1px solid white',
              }}
            >
              <TextField
                className="textfiled"
                fullWidth
                id="feedback"
                name="feedback"
                label="Feedback"
                multiline
                rows={4}
                placeholder="Enter Your Feedback"
                onChange={(e) => {
                  setFeedback(e.currentTarget.value);
                  if (feedback !== '') setError(false);
                }}
              />
              <Button
                sx={{
                  fontWeight: 'bold',
                  marginTop: '1.5rem',
                  backgroundColor: '#1B4B66',
                  color: '#FFF',
                  padding: '.3rem .5rem',
                  '&:hover': {
                    color: '#1B4B66',
                  },
                }}
                onClick={handleClose}
              >
                Submit
              </Button>
            </Box>
          </Modal>
        </Container>
      )}
    </>
  );
};

export default AboutPage;
