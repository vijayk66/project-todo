
import { useState } from "react";
import Select from "react-select";

const options = [
    {
        value: "pending",
        label: "Pending"
    },
    {
        value: "completed",
        label: "Completed"
    }
];

const styles = {
    control: (base_style, state) => ({
        ...base_style,
        backgroundColor: "#cff4fc",
        border: "none",
        borderRadius: "8px"
    }),
    singleValue: (base_style, state) => ({
        ...base_style,
        color: "black",
        fontWeight: "700"
    }),

    // Dropdown arrow
    dropdownIndicator: (base_style, state) => ({
        ...base_style,
        border: "none",
        color: "black",
    }),

    // Verticle line
    indicatorSeparator: (base_style, state) => ({
        ...base_style,
        display: "none",
    }),

};

function Todo(props) {

    const [selectedOption, setSelectedOption] = useState(options[0]);

    return (
        <div className="row flex-nowrap">
            <div className="col-4 col-sm-2 text-center ">
                <p className={`${props.type == 2 ? "bg-danger-subtle" : "bg-warning-subtle"} mb-0 fw-bold  py-2 rounded-3`}>
                    {props.itemNo}
                </p>
            </div>
            <div className="col-12 col-sm-7 text-center">
                <p className="fw-bold bg-primary-subtle py-2 rounded-3 d-flex justify-content-between px-2 px-sm-4">
                    {props.item.todo}
                    <div className="d-flex flex-nowrap gap-4">
                        {props.type !== 2 &&
                            <span className="cursor-pointer"
                                onClick={props.onEdit}>
                                &#9998;
                            </span>
                        }
                        <span className="cursor-pointer"
                            onClick={props.onDelete}>
                            &#10060;
                        </span>
                    </div>
                </p>
            </div>
            <div className="col-8 col-sm-3 text-center">
                {
                    props.type == 2 ? (
                        <p className="py-2 text-green bg-success-subtle rounded-3 fw-bold">{props.status}</p>
                    ) : (
                        <Select
                            styles={styles}
                            defaultValue={selectedOption}
                            options={options}
                            isSearchable={false}
                            onChange={(selected) => {
                                setSelectedOption(selected);
                                props.onStatusChange(props.item.id);
                            }}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default Todo;