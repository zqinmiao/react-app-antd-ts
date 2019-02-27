import { Layout } from 'antd';
import * as React from 'react';

import styles from './index.less';

export interface BasicLayoutProps extends React.Props<any> {
  history?: History;
  location?: Location;
}

const { Content } = Layout;
class Layouts extends React.PureComponent<BasicLayoutProps> {
  public render() {
    console.warn('Render Layout');
    return (
      <div className={styles['app-wrapper']}>
        <Layout className={styles['layout-wrapper']}>
          <Layout className={styles['layout-box']}>
            <Content className={styles['layout-content']}>
              <div className={styles['main-wrapper']}>
                <div className={styles['main-wrapper-inner']}>{this.props.children}</div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default Layouts;
