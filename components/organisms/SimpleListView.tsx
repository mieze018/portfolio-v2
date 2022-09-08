// ⚛️
import React, { useContext } from 'react';
// 🧰

// import { AutoSizer, Column, Table } from 'react-virtualized';
//💎

// 🙂

// 🧩
import { SetErrMsg } from 'functions';
import { DataCTX } from 'App';

// 🏁
const Results = (props: any, { ...rest }) => {
  const GetDataCTX: any = useContext(DataCTX);
  const status = !props.data
    ? 'loading'
    : props.data[0] && props.data[0].isAxiosError
    ? 'failed'
    : 'success';
  //🚩
  return (
    <div>
      <table>
        <thead>
          <tr style={{ whiteSpace: 'nowrap' }}>
            {props.parameters &&
              props.parameters.map((item: any) => {
                if (!item.hide_in_list)
                  return (
                    <td align="center" key={`header_${item.input_name}`}>
                      {item.label}
                    </td>
                  );
                return null;
              })}
            <td align="center"></td>
          </tr>
        </thead>
        {status === 'success' && props.data.length > 0 && (
          <tbody>
            {props.data.map((item: any, index: number) => {
              return (
                <tr key={item.id ? item.id : `data_${index}`}>
                  {props.parameters.map((item1: any) => {
                    const newLocal =
                      item1.MenuItem &&
                      item1.MenuItem.find((menu: any) => {
                        return menu.id === item[item1.input_name];
                      });
                    if (!item1.hide_in_list)
                      return (
                        <td
                          key={`${item.id}_${item1.input_name}`}
                          // align={item1.align}
                          style={item1.style}
                        >
                          {newLocal
                            ? newLocal.name
                            : item1.displayText
                            ? item1.displayText(item)
                            : item[item1.input_name]}
                        </td>
                      );
                    return null;
                  })}
                  <td align="center" style={{ whiteSpace: 'nowrap' }}></td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
      {status === 'success' && !props.data.length && (
        <div>0件： データがありません</div>
      )}
      {status === 'failed' && (
        <div>
          データを取得できませんでした：
          {props.data ? SetErrMsg(props.data[0]) : null}
        </div>
      )}
      {(status === 'loading' || GetDataCTX.loading === true) && (
        <div>loading...</div>
      )}
    </div>
  );
};

export default Results;
