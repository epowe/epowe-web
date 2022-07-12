import React, { useState } from "react";

const AddRemoveInputField = () => {
  const [inputFields, setInputFields] = useState([
    {
      question: "",
    },
  ]);

  const addInputField = () => {
    setInputFields([
      ...inputFields,
      {
        question: "",
      },
    ]);
  };

  const removeInputFields = (index) => {
    const rows = [...inputFields];
    rows.splice(index, 1);
    setInputFields(rows);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...inputFields];
    list[index][name] = value;
    setInputFields(list);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-13">
          {inputFields.map((data, index) => {
            const { question } = data;
            return (
              <div className="row my-3" key={index}>
                <div className="col-11">
                  <div className="form-group">
                    <input
                      type="text"
                      onChange={(event) => handleChange(index, event)}
                      value={question}
                      name="question"
                      className="form-control shadow-none"
                      placeholder="질문"
                      autocomplete="off"
                    />
                  </div>
                </div>
                <div className="col-1">
                  {inputFields.length !== 1 ? (
                    <button
                      className="btn btn-outline-secondary"
                      onClick={removeInputFields}
                    >
                      x
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            );
          })}
          <div className="row">
            <div className="col-xl-4">
              {inputFields.length < 5 ? (
                <button
                  className="btn btn-sm btn-light"
                  onClick={addInputField}
                >
                  질문 추가
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRemoveInputField;
