import React from "react";
import MySelect from "./Ui/select/MySelect";
import MyInput from "./Ui/input/MyInput";

const PostFilter = function({filter, setFilter}) {
    return (
        <div>
        <MyInput
          value={filter.query}
          onChange={e => setFilter({...filter, query: e.target.value})}
          type='text'
          placeholder='Поиск...' />
        <MySelect
          value={filter.sort}
          onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
          defaultValue='Сортировка'
          options={[
            { value: 'title', name: 'По названию' },
            { value: 'body', name: 'По описанию' },
          ]}
        />
      </div>
    )
}

export default PostFilter;