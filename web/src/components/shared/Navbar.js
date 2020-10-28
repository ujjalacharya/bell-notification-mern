import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Dropdown, message, Badge } from "antd";
import socketIOClient from "socket.io-client";

const { Header } = Layout;

export const socket = socketIOClient("http://localhost:3001/");

const Nav = () => {
  const [feeds, setFeeds] = useState([]);
  const [isNewFeed, setIsNewFeed] = useState(false);
  useEffect(() => {
    socket.emit("initial_data");
    socket.on("get_data", getData);
    socket.on("change_data", changeData);
    return () => {
      socket.off("get_data");
      socket.off("change_data");
    };
  }, []);

  const getData = (feeds) => {
    if (feeds.length && feeds.some((feed) => feed.read === false)) {
      setIsNewFeed(true);
    } else {
      setIsNewFeed(false);
    }
    setFeeds(feeds);
  };

  const changeData = () => socket.emit("initial_data");

  const handleClick = ({ key }) => {
    message.info(`Clicked on item ${key}`);
  };

  const handleDropdownClick = () => {
    socket.emit("check_all_notifications");
  };

  const menu = (
    <Menu onClick={handleClick}>
      {feeds.length ? (
        feeds.map((feed) => {
          return (
            <Menu.Item key={feed._id}>
              <p>{feed.title}</p>
            </Menu.Item>
          );
        })
      ) : (
        <Menu.Item key="nothing">
          <p>No feeds to show!</p>
        </Menu.Item>
      )}
    </Menu>
  );
  return (
    <nav>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          // defaultSelectedKeys={["1"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/test">Test</Link>
          </Menu.Item>
          <div style={{ position: "absolute", left: "95%", top: 0 }}>
            <Dropdown
              overlay={menu}
              trigger={["click"]}
              onClick={handleDropdownClick}
            >
              {isNewFeed ? (
                <Badge dot>
                  <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fa fa-bell" style={{ color: "white" }}></i>
                  </a>
                </Badge>
              ) : (
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="fa fa-bell" style={{ color: "white" }}></i>
                </a>
              )}
            </Dropdown>
          </div>
        </Menu>
      </Header>
    </nav>
  );
};

export default Nav;
