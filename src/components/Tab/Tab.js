import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { FaChevronLeft, FaChevronRight, FaPlus } from 'react-icons/fa';
import { cloneDeep } from 'lodash';

import Modal from '../modal/Modal';

const MAX_TAB_LIMIT = 10;

const myTabRef = React.createRef();

export default class Tab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      containerScrollPosition: {
        scrollLeft: 0,
        scrollWidth: 0,
        clientWidth: 0,
      },
      tabs: [
        { title: 'Tab1', content: 'Tab 1 contents' },
        { title: 'Tab2', content: 'Tab 2 contents' },
        { title: 'Tab3', content: 'Tab 3 contents' },
      ],
      currentTab: 0,
      isAddTabButtonVisible: false,
      isSliderVisible: false,
      isSliderPresent: false,
      openModal: {
        show: false,
        index: 0,
      },
    };
  }

  componentDidMount() {
    this.setState({
      containerScrollPosition: {
        scrollLeft: myTabRef.current.scrollLeft,
      },
    });
  }

  componentDidUpdate() {
    if (myTabRef.current) {
      let visibleTab =
        myTabRef.current.scrollWidth > myTabRef.current.clientWidth;

      if (visibleTab !== this.state.isSliderPresent) {
        this.setState({ isSliderPresent: visibleTab });
      }
    }
  }

  getContainerScrollPosition = () => {
    if (myTabRef.current) {
      let isVisible =
        myTabRef.current.scrollWidth > myTabRef.current.clientWidth;
      if (isVisible !== this.state.isSliderPresent) {
        this.setState({ isSliderPresent: isVisible });
      }
    }
  };

  handleListItemClick = (index, e) => {
    const { currentTab } = this.state;
    e.stopPropagation();
    if (index !== currentTab) {
      this.switchTabs(index, e);
    }
  };

  moveLeft = (e) => {
    myTabRef.current.scrollLeft += 400;
    this.setState({
      containerScrollPosition: {
        scrollLeft: myTabRef.current.scrollLeft,
      },
    });
  };

  moveRight = (e) => {
    myTabRef.current.scrollLeft -= 400;
    this.setState({
      containerScrollPosition: {
        scrollLeft: myTabRef.current.scrollLeft,
      },
    });
  };

  switchTabs = (currentTab) => {
    this.setState({ currentTab });
  };

  updateTabs = (updatedTabs, switchTab) => {
    this.setState({
      tabs: updatedTabs,
      tabTitles: updatedTabs.map((item) => {
        return item.title;
      }),
    });
    if (switchTab) {
      this.setState({ currentTab: updatedTabs.length - 1 }, () => {
        this.moveLeft();
      });
    }
  };

  addTab = () => {
    const { tabs } = this.state;
    if (tabs.length < MAX_TAB_LIMIT) {
      let updatedTabs = cloneDeep(tabs);
      updatedTabs.push({
        title: `Tab${updatedTabs.length + 1}`,
        content: `Tab ${updatedTabs.length + 1} contents`,
      });
      this.updateTabs(updatedTabs, true);
    }
  };

  deleteTab = (index) => {
    const { tabs } = this.state;
    let updatedTabs = cloneDeep(tabs);
    updatedTabs.splice(index, 1);
    this.updateTabs(updatedTabs);
    index === 0 ? this.switchTabs(index) : this.switchTabs(index - 1);
    this.setState({ openModal: { show: false } });
  };

  performDeleteTabAction = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.tabs.length === 1) return;

    this.setState({ openModal: { show: true, index } });
  };

  sliderVisible = () => {
    if (myTabRef) {
      let isSliderBoxShadowVisible =
        myTabRef.current.scrollLeft + myTabRef.current.clientWidth <
        myTabRef.current.scrollWidth;
      if (isSliderBoxShadowVisible !== this.state.isSliderVisible) {
        this.setState({ isSliderVisible: isSliderBoxShadowVisible });
      }
    }
  };

  addTabButtonVisible = () => {
    if (myTabRef) {
      let isAddTabBoxShadowVisible = myTabRef.current.scrollLeft !== 0;
      if (isAddTabBoxShadowVisible !== this.state.isAddTabButtonVisible) {
        this.setState({ isAddTabButtonVisible: isAddTabBoxShadowVisible });
      }
    }
  };

  handleTabContainerScroll = (e) => {
    this.sliderVisible();
    this.addTabButtonVisible();
  };

  render() {
    this.getContainerScrollPosition();
    return (
      <>
        <TabSection>
          <TabNavigation>
            <Slider
              isVisible={this.state.isSliderPresent}
              scrollAreaAvailable={this.state.containerScrollPosition}
            >
              <Chevron
                disabled={!this.state.isAddTabButtonVisible}
                onClick={this.moveRight}
              >
                <FaChevronLeft />
              </Chevron>
            </Slider>
            <TabList ref={myTabRef} onScroll={this.handleTabContainerScroll}>
              {this.state.tabs.map((value, index) => {
                const hideDelete = this.state.tabs.length === 1;
                return (
                  <ContainerWrapper
                    active={index === this.state.currentTab}
                    key={value.title + index}
                  >
                    <ListItemWrapper active={index === this.state.currentTab}>
                      <ItemWrapper
                        onClick={this.handleListItemClick.bind(this, index)}
                        active={index === this.state.currentTab}
                        title={value.title}
                        tabIndex={0}
                      >
                        <Item>{value.title}</Item>
                      </ItemWrapper>
                    </ListItemWrapper>
                    {!hideDelete && (
                      <Delete
                        className="delete"
                        onClick={(e) => this.performDeleteTabAction(e, index)}
                      >
                        {' '}
                        X{' '}
                      </Delete>
                    )}
                  </ContainerWrapper>
                );
              })}
            </TabList>
            <Slider
              isVisible={this.state.isSliderPresent}
              scrollAreaAvailable={this.state.containerScrollPosition}
            >
              <Chevron
                disabled={!this.state.isSliderVisible}
                onClick={this.moveLeft}
              >
                <FaChevronRight />
              </Chevron>
            </Slider>

            <ItemWrapperAddTab
              id="reportTabAdd"
              title="Add Tab"
              disabled={this.state.tabs.length === MAX_TAB_LIMIT}
              onClick={this.addTab}
              tabIndex={0}
            >
              <ItemAdd disabled={this.state.tabs.length === MAX_TAB_LIMIT}>
                <FaPlus />
              </ItemAdd>
            </ItemWrapperAddTab>
          </TabNavigation>
          <Body>{this.state.tabs[this.state.currentTab].content}</Body>
        </TabSection>
        {this.state.openModal.show && (
          <Modal
            setConfirm={() => this.deleteTab(this.state.openModal.index)}
            closeModal={() => this.setState({ openModal: { show: false } })}
            tabName={this.state.tabs[this.state.openModal.index].title}
          />
        )}
      </>
    );
  }
}

const TabSection = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  margin: 30px;
  padding: 20px;
  border: 1px dashed #dadfe3;
  font-size: 23px;
  border-radius: 4px;
`;

const Delete = styled.div`
  visibility: hidden;
  position: absolute;
  right: 8px;
  top: 4px;
  color: #475867;
  font-size: 12px;
`;

const Slider = styled.div`
  display: flex;
  align-items: center;
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  z-index: 1;
`;

const Chevron = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 32px;
  ${(props) =>
    props.disabled &&
    `
        cursor: not-allowed;
        opacity: 0.3;
    `}
`;

const TabList = styled.div`
  overflow: auto;
  display: flex;
  transform: translae3d(0, 0, 0);
  transition: all 200ms linear;
  scroll-behavior: smooth;
  ::-webkit-scrollbar {
    display: none;
  }
  ${(props) =>
    props.disabled &&
    `
        pointer-events: none;
    `}
`;

const TabNavigation = styled.div`
  display: flex;
  width: 100%;
  background-color: #f5f7f9;
  width: 100%;
  border-top: 1px solid #dadfe3;
  overflow-y: hidden;
`;

const Item = styled.div`
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre;
  text-align: center;
`;

const ItemAdd = styled.div`
  display: flex;
  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.6;
      pointer-events: none;
    `}
`;

const ItemWrapper = styled.div`
  align-items: center;
  display: flex;
  line-height: 16px;
  color: ${(props) => (props.active ? '#2C5CC5' : '#475867')};
  font-size: 14px;
  font-weight: bold;
  padding: 12px 24px;
  background-color: ${(props) => (props.active ? '#FFFFFF' : '#F5F7F9')};
  cursor: pointer;
  outline: none !important;
  border-bottom: 2px solid
    ${(props) => (props.active ? '#2C5CC5' : 'transparent')};
`;

const ItemWrapperAddTab = styled(ItemWrapper)`
  border-right: 1px solid #d3dae0;
  z-index: 1;
  padding-right: 10px !important;
  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
    `}
  width: 56px;
  justify-content: center;
`;

const ContainerWrapper = styled.div`
  position: relative;
  align-items: center;
  display: flex;
  line-height: 16px;
  font-size: 14px;
  font-weight: bold;
  border-right: 1px solid #d3dae0;
  height: 100%;
  background-color: ${(props) => (props.active ? '#FFFFFF' : '#F5F7F9')};
  cursor: pointer;

  &:hover {
    .delete {
      visibility: visible !important;
    }
  }
`;

const ListItemWrapper = styled.div`
  height: 100%;
  display: flex;
`;
