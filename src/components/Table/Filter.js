import React from "react"
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { FILTER_TYPES, FILTER_TYPE_ATTRIBUTES, RELATION_FIELD_ATTRIBUTES } from "../../constant/common";
import { FilterValue } from "./FilterValue";

export const Filter = React.memo(({ appliedFilters, columns, applyFilters }) => {

	const [isShow, setShow] = React.useState(false);
	const [filters, setFilters] = React.useState(appliedFilters || []);
	const { setValue, watch, control, handleSubmit } = useForm();

	React.useEffect(() => {
		if (appliedFilters && appliedFilters.length > 0) {
			setValue('filters', appliedFilters);
		}
	}, [appliedFilters]);

	const options = React.useMemo(
		() =>
			columns.map(item => ({
				label: item?.displayName,
				value: item?.accessor,
			}))
		,
		[columns]
	);

	const filterOptions = React.useMemo(
		() => Object.keys(FILTER_TYPES).map(key => ({
			label: FILTER_TYPES[key],
			value: FILTER_TYPES[key],
		})),
		[FILTER_TYPES]
	);

	const addFilter = () => {
		let lastIndexPlusOne;
		if (filters.length > 0) {
			lastIndexPlusOne = Math.max(...filters.map(item => item.id)) + 1;
		} else {
			lastIndexPlusOne = 0;
		}
		setFilters(oldFilters => ([...oldFilters, {
			id: lastIndexPlusOne,
			q1: '',
			q2: '',
			type: '',
		}]));
	};

	const deleteFilter = (id, index) => {
		const latestFilters = [...filters].filter(current => current.id !=id )
		setFilters(latestFilters);
    setValue(`filters.${index}.q1`, "");
    setValue(`filters.${index}.type`, "");
    setValue(`filters.${index}.q2`, "");

		if (latestFilters?.length === 0) {
			applyFilters({});
		}
	}

	const getValue = (value, options) => {
		return options.find(item => item.value === value);
	};

	const getAttribute = (attrName) => columns.find(item => item?.accessor === attrName);

	const getOptions = (attrName) => {
		const attr = columns.find(item => item.accessor === attrName);
		const attrType = attr?.attrType || "";
		if (attr?.modelName) {
			return RELATION_FIELD_ATTRIBUTES.map(item => ({ label: item, value: item }));
		}
		const result = [];
		Object.keys(FILTER_TYPE_ATTRIBUTES).map(key => {
			if (FILTER_TYPE_ATTRIBUTES[key].includes(attrType)) {
				result.push({
					label: FILTER_TYPES[key],
					value: FILTER_TYPES[key],
				});
			};
		});
		return result;
	};

	const filterData = (data) => {
		const result = { filters: [] };
		if (data?.filters && Array.isArray(data?.filters)) {
			result.filters = data?.filters?.filter(item => item?.q1 !== "" && item?.q2 !== "" && item?.type !== "");
		}
		return result;
	};

	const preSubmit = (data) => {
		applyFilters(filterData(data));
		setShow(false);
	};

  const clearFilters = () => {
    applyFilters({ filters: [] });
    setFilters([]);
  }

	return (
		<div>
			<button
				onClick={() => setShow(!isShow)}
				className="btn btn-primary mr-2 btn-xs"
				type="button"
				style={{
					width: '34px',
					height: '34px',
					marginLeft: '10px',
				}}
			>
				<img style={{ width: '14px', height: '14px' }} src={require("../../assets/images/filter.svg")} alt="" />
			</button>

			{
				isShow &&
				<div style={{ marginLeft: '10px', marginTop: '10px' }} className={`filterDropdown ${isShow && "show"}`}>
					<div className="filterTitle">
						<span>Filter</span>
					</div>
					<div className="filterWrapper">

						{
							filters.map((filter, index) => (
								<div key={index} className="d-flex filterBox">
									<div className="bigSelect">
										<Controller
											control={control}
											name={`filters.${index}.q1`}
											render={({
												field: { onChange, value, name, ref },
											}) => (
												<Select
													ref={ref}
													name={name}
													className="digits-container"
													classNamePrefix="select_box"
													options={options}
													value={getValue(value, options)}
													onChange={(data) => onChange(data?.value)}
													placeholderText="Select value"
												/>
											)}
										/>
									</div>
									<div className="smallSelect">
										<Controller
											control={control}
											name={`filters.${index}.type`}
											render={({
												field: { onChange, value, name, ref },
											}) => (
												<Select
													ref={ref}
													name={name}
													className="digits-container"
													classNamePrefix="select_box"
													options={watch(`filters.${index}.q1`) ? getOptions(watch(`filters.${index}.q1`) || "") :  filterOptions}
													value={getValue(value, filterOptions)}
													onChange={(data) => onChange(data?.value)}
													placeholder="Type"
												/>
											)}
										/>
									</div>
									<div className="bigSelect">
										<FilterValue
											name={`filters.${index}.q2`}
											control={control}
											attribute={getAttribute(watch(`filters.${index}.q1`))}
										/>
									</div>
									<div onClick={() => deleteFilter(filter.id, index)} className="filterClose">
										<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="80%" height="80%" class="m-auto" viewBox="0 0 24 24"><g id="Layer_4"><path d="M13.909,12.001l8.918-8.92c0.526-0.526,0.526-1.383,0-1.909c-0.243-0.244-0.592-0.384-0.954-0.384s-0.711,0.14-0.954,0.384 L12,10.091L3.082,1.172C2.837,0.928,2.49,0.788,2.127,0.788s-0.71,0.14-0.955,0.384c-0.526,0.526-0.526,1.383,0,1.909l8.918,8.92 l-8.918,8.92c-0.526,0.526-0.526,1.382,0,1.908c0.244,0.244,0.592,0.384,0.955,0.384s0.71-0.14,0.955-0.384L12,13.91l8.919,8.919 c0.255,0.256,0.594,0.396,0.954,0.396s0.699-0.14,0.954-0.396c0.526-0.526,0.526-1.382,0-1.908L13.909,12.001z"></path></g><g id="Layer_2"></g></svg>
									</div>
								</div>
							))
						}

					</div>
					<div className="AddFilterBox">
						<div onClick={addFilter}>
							<svg width="100%" height="100%" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 492 492"><g><g><path d="M465.064,207.566l0.028,0H284.436V27.25c0-14.84-12.016-27.248-26.856-27.248h-23.116
										c-14.836,0-26.904,12.408-26.904,27.248v180.316H26.908c-14.832,0-26.908,12-26.908,26.844v23.248
										c0,14.832,12.072,26.78,26.908,26.78h180.656v180.968c0,14.832,12.064,26.592,26.904,26.592h23.116
										c14.84,0,26.856-11.764,26.856-26.592V284.438h180.624c14.84,0,26.936-11.952,26.936-26.78V234.41
										C492,219.566,479.904,207.566,465.064,207.566z"></path></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
							<span>Add filter</span>
						</div>
						{filters.length > 0 && (
                <div className='flex'>
                  <div className="AddFilterBox mr-1 btn-danger">
                      <div onClick={clearFilters}>
                        <span>Clear filters</span>
                      </div>
                  </div>
                  <div className="AddFilterBox">
                      <div onClick={() => handleSubmit(preSubmit)()}>
                        <span>Apply filters</span>
                      </div>
                  </div>
                </div>
              )}
					</div>
				</div>
			}

		</div>
	)
})
