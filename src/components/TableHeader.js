const TableHeader = ({selectAll}) => {
  return (
    <>
      <thead>
        <tr>
          <th scope="col" className="text-center">
            <input
              className="form-check-input "
              type="checkbox"
              id="flexCheckChecked"
              name="isAllSelected"
              onClick={selectAll}
            />
          </th>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Registered</th>
          <th scope="col">Last login</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
    </>
  );
};

export default TableHeader;
