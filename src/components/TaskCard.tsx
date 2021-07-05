import { Box, Button, Card, CardContent, Typography } from '@material-ui/core';
import styled from 'styled-components';

const TaskCard = styled(Card)`
  margin: 10px;
  padding: 10px;
  display: Flex;
  flex-direction: Column;
  align-items: space-between;
`;

const Actions = styled.div`
  align-self: flex;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledTaskCard = () => {
  return (
    <TaskCard>
      <CardContent>
        <Typography style={{ wordWrap: 'break-word' }} variant="h5" component="h2">
          title
        </Typography>
        <Typography style={{ wordWrap: 'break-word' }} variant="body1">
          texttextexttexttextexttexttextexttexttextextxttexttextexttexttextextxttexttextexttexttextextxttexttextexttexttextextxttexttextexttexttextextxttexttextexttexttextext
          texttextexttexttextexttexttextexttexttextextttextextttextextttextextttextextttextextttextextttextextttextextttextextttextextttextext
        </Typography>
      </CardContent>
      <Actions>
        <Button variant="contained" color="secondary">skip</Button>
        <Button variant="contained" color="primary">done</Button>
      </Actions>
    </TaskCard>
  );
};

export default StyledTaskCard;
