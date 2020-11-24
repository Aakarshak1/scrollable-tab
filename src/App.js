import styled from 'styled-components';
import Tab from './components/Tab/Tab';

function App() {
  return (
    <TabSection>
      <Header>Scrollable Tabs</Header>
      <Body>
        <Tab />
      </Body>
    </TabSection>
  );
}

export default App;

const TabSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5% 10%;
  border: 1px solid #dadfe3;
  border-radius: 4px;
  box-shadow: 0px 0px 5px 0px #dadfe3;
`;

const Header = styled.div`
  margin: 20px 30px;
  width: 100%;
  font-size: 20px;
  text-align: center;
`;

const Body = styled.div`
  height: 600px;
  width: 100%;
`;
