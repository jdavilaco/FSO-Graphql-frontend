
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const BirthyearForm = ( { authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ modifyAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const submit = async (event) => {
    event.preventDefault()

    if (!name || !born) {
      return
    }

    modifyAuthor({ variables: { name, setBornTo: born } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            options={authors.map(author => ({ value: author.name, label: author.name }))}
            onChange={(selectedOption) => setName(selectedOption.value)}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type="submit">update author</button>{/*  */}
      </form>
    </div>
  )
}

BirthyearForm.propTypes = {
  authors: PropTypes.array.isRequired,
}

export default BirthyearForm
