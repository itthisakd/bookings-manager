{/* <form name="search-fields" className="outline-black w-11/12 flex ">
          <div className="h-1">
            <InputBox label="Reservation ID" type="number" />
          </div>
          <div>
            <InputBox label="Guest Name" type="search" />
          </div>
          <div>
            <DropDown
              label="Show Dates By"
              options={[
                { value: 'checkin', label: 'Check-in' },
                { value: 'checkout', label: 'Check-out' },
                { value: 'createdat', label: 'Created At' }
              ]}
            />
          </div>

          <div>
            <TextField
              id="date"
              label="Date"
              type="date"
              defaultValue={new Date().toISOString().slice(0, 10)}
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
          <div>
            <DropDown
              label="Filter By"
              options={[
                { value: 'all', label: 'All' },
                { value: 'booked', label: 'Booked' },
                { value: 'modified', label: 'Modified' },
                { value: 'cancelled', label: 'Cancelled' }
              ]}
            />
          </div>
          <div>
            <Button variant="contained" color="primary">
              Clear All
            </Button>
          </div>
          <div>
            <Button variant="contained" color="primary">
              Search
            </Button>
          </div>