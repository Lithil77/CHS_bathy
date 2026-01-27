import React from 'react';
import { Form, FloatingLabel, Stack } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';

const TypeaheadMultiField = ({
    id,
    label,
    options,
    placeholder,
    selected,
    onChange,
    isInvalid,
    isValid,
    ...rest
}) => {
    const inputClassName = isInvalid ? 'is-invalid' : isValid ? 'is-valid' : '';

    const allSelected = selected.length === options.length;

    const handleSelectionChange = (selectedOptions) => {
        if (selectedOptions.includes(allSelected ? 'Unselect All' : 'Select All')) {
            if (allSelected) {
                onChange([]);
            } else {
                onChange(options);
            }
        } else {
            onChange(selectedOptions);
        }
    };

    const selectAllLabel = allSelected ? 'Unselect All' : 'Select All';

    const allOptions = [selectAllLabel, ...options];

    return (
        <Typeahead
            clearButton
            id={id}
            onChange={handleSelectionChange}
            options={allOptions}
            placeholder={placeholder}
            selected={selected}
            multiple
            renderInput={({ inputRef, referenceElementRef, ...inputProps }) => (
                <FloatingLabel controlId={id}>
                    <Form.Control
                        {...inputProps}
                        ref={(node) => {
                            inputRef(node);
                            referenceElementRef(node);
                        }}
                        className={inputClassName}
                        value={selected.join(', ')}
                        readOnly
                    />
                    <label htmlFor={id}>
                        <Stack direction="horizontal">
                            <label style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {label}
                            </label>
                        </Stack>
                    </label>
                </FloatingLabel>
            )}
            {...rest}
        />
    );
};

export default TypeaheadMultiField;
