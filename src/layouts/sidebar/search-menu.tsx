import { Select } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import { toggleMenuSelect } from "redux/actions/app";
import { IRoutes } from "types/index";

const Option = Select.Option;

function createFilter(queryString: string) {
  return (restaurant: IRoutes) =>
    restaurant.title.toLowerCase().indexOf(queryString.toLowerCase()) > -1;
}

// 初始化state
const initialState = {
  routes: [], // 路由options
  value: "" // 搜索框中的值
};

// 定义state为只读类型
type State = Readonly<typeof initialState>;

class SearchMenu extends React.PureComponent<any, State> {
  public readonly state: State = initialState;

  // 无嵌套关系的所有路由list
  public routes: IRoutes[] = [];

  public componentWillMount() {
    this.routes = this.props.searchSidebar;
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
    cb: (list: IRoutes[]) => void
  ): void => {
    const restaurants = this.routes;
    const results = queryString
      ? restaurants.filter(createFilter(queryString))
      : restaurants;
    cb(results);
  };

  // 触发选择
  public handleSelect = (value: string): void => {
    this.props.history.push(value);
    this.props.toggleMenuSelect([value]);
    this.setState({ value });
  };

  public render() {
    console.warn("Render Search-Menu");
    // select option 列表项
    const options = this.state.routes.map((route: IRoutes, index: number) => (
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

export default connect(
  null,
  { toggleMenuSelect }
)(SearchMenu);
