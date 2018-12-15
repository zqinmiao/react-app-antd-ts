import { Select } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toggleMenuSelect } from "redux/actions/app";

const Option = Select.Option;

function createFilter(queryString: string) {
  return (restaurant: any) =>
    restaurant.title.toLowerCase().indexOf(queryString.toLowerCase()) > -1;
}

// 定义接口
interface IProps {
  extractFilterRoutes: any[];
  history: any;
  toggleMenuSelect(keys: string[]): void;
}

// 初始化state
const initialState = {
  routes: [], // 路由options
  value: undefined // 搜索框中的值
};

// 定义state为只读类型
type State = Readonly<typeof initialState>;

class SearchMenu extends React.PureComponent<IProps, State> {
  public readonly state: State = initialState;

  // 无嵌套关系的所有路由list
  public routes: any[] = [];

  public componentWillMount() {
    this.routes = this.props.extractFilterRoutes;
  }

  // 触发搜索
  public handleSearch = (value: string) => {
    if (value) {
      this.querySearch(value, (routes: []) => this.setState({ routes }));
    } else {
      this.setState({ routes: [] });
    }
  };

  // 处理搜索
  public querySearch = (
    queryString: string,
    cb: (list: any[]) => any
  ): void => {
    const restaurants = this.routes;
    const results = queryString
      ? restaurants.filter(createFilter(queryString))
      : restaurants;
    cb(results);
  };

  // 触发选择
  public handleSelect = (value: any, { key }: any) => {
    this.props.history.push(value);
    this.props.toggleMenuSelect([key]);
    this.setState({ value });
  };

  public render() {
    console.warn("Render Search-Menu");
    // select option 列表项
    const options = this.state.routes.map((route: any, index: number) => (
      <Option key={route.path} value={route.path}>
        {route.title}
      </Option>
    ));
    return (
      <div className={"search-menu"}>
        <Select
          autoClearSearchValue={true}
          style={{ width: "100%" }}
          showSearch={true}
          value={this.state.value}
          placeholder="搜索菜单"
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onSearch={this.handleSearch}
          onSelect={this.handleSelect}
          notFoundContent={null}
        >
          {options}
        </Select>
      </div>
    );
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    extractFilterRoutes: state.app.extractFilterRoutes
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { toggleMenuSelect }
  )(SearchMenu)
);
