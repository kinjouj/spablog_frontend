import React from "react";

export default class EntryList extends React.Component {
  render() {
    let entries = this.props.blogState.entries;

    if (!entries) {
      return (
        <div></div>
      );
    }

    let entryItems = entries.map(entry => {
      let categories = entry.categories;
      let categoriesContent = categories.map(category => {
        return (
          <a key={category.name} href={"/categories/" + category.path} className="category">{category.name}</a>
        );
      });

      return (
        <div key={entry.permalink} className="entry">
          <div>
            <h3 className="entry-title"><a href={entry.permalink}>{entry.title}</a></h3>
            <p className="meta">
              {entry.date}
              <span className="categories">
                {categoriesContent}
              </span>
            </p>
            <div className="entry-content" dangerouslySetInnerHTML={{__html: entry.content}}>
            </div>
            <div className="excerpt">
              <a className="box-link" href={entry.permalink}>続きを見る</a>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        {entryItems}
      </div>
    );
  }
}
