import React from "react";

const Messanger = () => {
  return (
    <section className="dialogue-window container" aria-label="Диалоговое окно">
      <div className="messanger">
        <div className="sms-wrapper">
          <p className="sms right-sms" aria-label="Ваше сообщение" tabIndex={1}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia omnis
            nesciunt natus non quibusdam explicabo.
          </p>
        </div>
        <div className="sms-wrapper">
          <p
            className="sms left-sms"
            aria-label="Сообщение собеседника"
            tabIndex={2}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
            quibusdam qui quam tempore repellat est!
          </p>
        </div>

        <div className="choose-answer">
          <button className="answer" aria-label="Вариант ответа" tabIndex={3}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente,
            sed.
          </button>
          <button className="answer" aria-label="Вариант ответа" tabIndex={4}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum,
            deserunt!
          </button>
          <button className="answer" aria-label="Вариант ответа" tabIndex={5}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident,
            quas!
          </button>
        </div>
      </div>
    </section>
  );
};

export default Messanger;
