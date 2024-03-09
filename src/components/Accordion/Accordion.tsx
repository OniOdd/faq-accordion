import style from './Accordion.module.css';
import data from './data.json';
import { useState } from 'react';

function Accordion() {
  const [selected, setSelected] = useState<number[]>([1]);

  function handleSelection(id: number) {
    const choices = [...selected];
    const findIndexOfCurrentId = choices.indexOf(id);

    if (findIndexOfCurrentId === -1) choices.push(id);
    else choices.splice(findIndexOfCurrentId, 1);

    setSelected(choices);
  }

  function keyDownHandler(event: React.KeyboardEvent, id: number) {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      event.preventDefault();
      handleSelection(id);
    }
  }

  return (
    <article className={style.accordion}>
      <header className={style.accordion__header}>
        <span className={style.accordion__icon}></span>
        <h1 className={style.accordion__title}>FAQs</h1>
      </header>
      {
        data && data.length > 0 && data.map(item => (
          <section className={`${style.accordion__section} ${style.section}`} key={item.id}
                   aria-label='Click on the question to see the answer'>
            <header className={style.section__header} tabIndex={0} onKeyDown={event => keyDownHandler(event, item.id)}
                    onClick={() => handleSelection(item.id)}>
              <h2 className={style.section__question}>{item.question}</h2>
              {
                selected.includes(item.id) ?
                  <span className={style.section__iconMinus}></span> :
                  <span className={style.section__iconPlus}></span>
              }
            </header>
            {selected.includes(item.id) && <p className={style.section__answer}>{item.answer}</p>}
          </section>
        ))
      }
    </article>
  );
}

export default Accordion;
