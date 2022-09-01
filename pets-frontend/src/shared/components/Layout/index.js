import { Aside } from '../Aside';
import { Content } from '../Content';
import { MainHeader } from '../MainHeader';

import { GridLayout } from './styles';

export const Layout = () => {
  return (
    <GridLayout>
      <Aside />
      <MainHeader />
      <Content />
    </GridLayout>
  );
};
