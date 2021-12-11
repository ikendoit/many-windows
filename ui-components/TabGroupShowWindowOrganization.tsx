import React from 'react';
import { Tabs, Table, Button, Input } from 'antd';
import { PaneWindowsTab } from '../types/ui-components/index'
import styles from '../styles/Home.module.css'

const { TabPane } = Tabs;


interface TabGroupShowWindowOrganizationProps {
  paneWindowTabIndexInFocus: number
  paneWindowsTabs: PaneWindowsTab[]
  setPaneWindowTabIndexInFocusAndRerender: (e: number) => void
  setPaneWindowsTabsAndRerender: (e: PaneWindowsTab[]) => void
  setPaneWindowIndexAndRerender: (e: number) => void
  paneWindowIndexInFocus: number
}

interface AttributeInEdit {
  recordIndex: number
  recordAttribute: 'link' | 'title'
}

interface OnChangeUpdateRecordAttributeAction extends AttributeInEdit{
  recordAttributeValue: string
}

interface TabPaneTitleInEdit {
  paneIndex: number
  paneAttribute: 'title'
}

interface OnChangeUpdateTabPaneTitleAction extends TabPaneTitleInEdit{
  tabPaneTitleValue: string
}

const ID_INPUT_FIELD_ATTRIBUTE_EDIT = "input_field_attribute_edit"
const ID_INPUT_TAB_PANE_ATTRIBUTE_EDIT = "input_field_tab_pane_edit"


const TabGroupShowWindowOrganization: React.FC<TabGroupShowWindowOrganizationProps> = (props) => {

  const [attributeInEdit, setAttributeInEdit] = React.useState<AttributeInEdit |null>(null)
  const [tabPaneInEdit, setTabPaneInEdit] = React.useState<TabPaneTitleInEdit |null>(null)

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      width: '30%',
      render: (text: string, record: any, recordIndex: number) => {
        return (
          <div style={{ width: '30rem' }}>
            {
              (attributeInEdit?.recordAttribute === 'title' && attributeInEdit?.recordIndex === recordIndex) ? (
                <Input 
                  style={{width: '60%'}}
                  id={`${ID_INPUT_FIELD_ATTRIBUTE_EDIT}__${record.key}`}
                  defaultValue={text}
                  prefix={
                    <div> 
                      <span 
                        onClick={() => onEdit(null, 'updateRecordAttribute')}
                        style={{paddingRight: 10}}
                      > ✅ </span> 
                      <span
                        onClick={() => setAttributeInEdit(null)}
                        style={{paddingRight: 10}}
                      > ❌ </span> 
                    </div>
                  }
                />
              ) : (
                <span onClick={() => setAttributeInEdit({recordIndex, recordAttribute: 'title'})}>
                  {text}
                </span>
              )
            }
            <Button onClick={() => removeLink(recordIndex)} style={{ position: 'absolute', right: 0, backgroundColor: 'pink' }}>Delete</Button>
          </div>
        )
      }
    },
    {
      title: 'URL',
      dataIndex: 'link',
      render: (text: string, record: any, recordIndex: number) => {
        return (
          <div style={{ width: '30rem' }}>
            {
              (attributeInEdit?.recordAttribute === 'link' && attributeInEdit?.recordIndex === recordIndex) ? (
                <Input 
                  style={{width: '60%'}}
                  id={`${ID_INPUT_FIELD_ATTRIBUTE_EDIT}__${record.key}`}
                  defaultValue={text}
                  prefix={
                    <div> 
                      <span 
                        onClick={() => onEdit(null, 'updateRecordAttribute')}
                        style={{paddingRight: 10}}
                      > ✅ </span> 
                      <span
                        onClick={() => setAttributeInEdit(null)}
                        style={{paddingRight: 10}}
                      > ❌ </span> 
                    </div>
                  }
                />
              ) : (
                <span onClick={() => setAttributeInEdit({recordIndex, recordAttribute: 'link'})}>
                  {text}
                </span>
              )
            }
          </div>
        )
      },
    }
  ];

  const {
    paneWindowTabIndexInFocus
    , paneWindowsTabs
    , paneWindowIndexInFocus
    , setPaneWindowTabIndexInFocusAndRerender
    , setPaneWindowsTabsAndRerender
    , setPaneWindowIndexAndRerender
  } = props;

  const onChangeTabPane = async (activeKey: string) => {
    setPaneWindowTabIndexInFocusAndRerender(parseInt(activeKey))
  };

  const onEdit = (targetKey: any | OnChangeUpdateRecordAttributeAction, action: string) => {

    switch (action) {
      case "add": {
        add();
        break;
      }
      case "remove": {
        removePane(targetKey);
        break;
      }
      case "updateRecordAttribute": {

        if (attributeInEdit === null) break;
        const inputValue = document.getElementById(`${ID_INPUT_FIELD_ATTRIBUTE_EDIT}__${attributeInEdit.recordIndex}_${paneWindowTabIndexInFocus}`);
        if (inputValue === null) break;

        updateRecordAttribute({
          ...attributeInEdit,
          recordAttributeValue: (inputValue as HTMLInputElement).value
        })

        setAttributeInEdit(null)
        break;
      }
      case "updateTabPaneTitle": {
        if (tabPaneInEdit === null) break;
        const inputValue = document.getElementById(`${ID_INPUT_TAB_PANE_ATTRIBUTE_EDIT}__${tabPaneInEdit.paneIndex}`);
        if (inputValue === null) break;

        updateTabPaneTitle({
          ...tabPaneInEdit,
          tabPaneTitleValue: (inputValue as HTMLInputElement).value
        })

        setTabPaneInEdit(null)
        break;
      }
      default: break;
    }
  };

  const add = () => {
    setPaneWindowsTabsAndRerender([
      ...paneWindowsTabs,
      {
        tabTitle: 'New Tab',
        tabContent: []
      }
    ])
  };

  const removePane = (targetKey: string) => {
    paneWindowsTabs.splice(parseInt(targetKey), 1);
    setPaneWindowTabIndexInFocusAndRerender(0);
    setPaneWindowsTabsAndRerender([
      ...paneWindowsTabs,
    ])
  };

  const removeLink = (tabContentIndex: number) => {
    paneWindowsTabs[paneWindowTabIndexInFocus].tabContent.splice(tabContentIndex, 1);
    setPaneWindowsTabsAndRerender([
      ...paneWindowsTabs
    ]);
  }

  const onAddNewWindow = () => {
    paneWindowsTabs[paneWindowTabIndexInFocus].tabContent.push({
      link: 'https://youtube.com',
      title: 'Youtube',
      nw: [0, 0],
      se: [7, 7]
    });
    setPaneWindowsTabsAndRerender([
      ...paneWindowsTabs
    ]);
  }

  const updateRecordAttribute = (action: OnChangeUpdateRecordAttributeAction) => {

    const windowTabInFocus = paneWindowsTabs[paneWindowTabIndexInFocus].tabContent;
    windowTabInFocus[action.recordIndex][action.recordAttribute] = action.recordAttributeValue
    setPaneWindowsTabsAndRerender([
      ...paneWindowsTabs
    ]);
  }

  const updateTabPaneTitle = (action: OnChangeUpdateTabPaneTitleAction) => {
    const tabPaneInFocus = paneWindowsTabs[paneWindowTabIndexInFocus];
    tabPaneInFocus.tabTitle = action.tabPaneTitleValue;
    setPaneWindowsTabsAndRerender([
      ...paneWindowsTabs
    ]);
  }

  return (
    <Tabs
      type="editable-card"
      onChange={onChangeTabPane}
      activeKey={`${paneWindowTabIndexInFocus}`}
      onEdit={onEdit}
    >
      {paneWindowsTabs.map((pane, paneIndex) => (
        <TabPane 
          tab={
              (tabPaneInEdit?.paneIndex === paneIndex) ? (
                <Input 
                  style={{width: '60%'}}
                  id={`${ID_INPUT_TAB_PANE_ATTRIBUTE_EDIT}__${paneIndex}`}
                  defaultValue={pane.tabTitle}
                  prefix={
                    <div> 
                      <span 
                        onClick={() => onEdit(null, 'updateTabPaneTitle')}
                        style={{paddingRight: 10}}
                      > ✅ </span> 
                      <span
                        onClick={() => setTabPaneInEdit(null)}
                        style={{paddingRight: 10}}
                      > ❌ </span> 
                    </div>
                  }
                />
              ) : (
                <span 
                  onClick={() => setTabPaneInEdit({paneIndex, paneAttribute: 'title'})}
                  style={{marginRight: '10rem'}}
                >
                  {pane.tabTitle}
                </span>
              )
            }
          key={paneIndex} 
          closable={paneIndex !== 0}
        >
          <Button onClick={onAddNewWindow}> +Add </Button>
          <Table
            columns={columns}
            dataSource={pane.tabContent.map((e, i) => {
              e.key = `${i}_${paneIndex}`;
              return e;
            })}
            onRow={(record: any, _) => {
              return {
                onMouseEnter: _ => setPaneWindowIndexAndRerender(parseInt(record.key.split('_')[0])), // mouse enter row
              };
            }}
            rowClassName={(_, index: number) => index === paneWindowIndexInFocus ? styles['table_row_light'] : styles['table_row_dark']}
            pagination={{ pageSize: 50 }}
            scroll={{ y: 240 }}
          />
        </TabPane>
      ))}
    </Tabs>
  );
}

export { TabGroupShowWindowOrganization }
