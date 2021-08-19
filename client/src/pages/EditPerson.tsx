import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react'
import styled from 'styled-components'
import { StyledFC } from '../types'
import Button from '../components/Button'
import { useHistory, useParams } from 'react-router-dom'
import Page from '../components/Page'
import {
  deletePerson,
  fetchPerson,
  fetchPersons,
  updatePerson,
} from '../http/personAPI'
import { PersonType } from '../App'
import { BASE_URL, FIRST_PAGE, LIMIT } from '../constants'
import Input from '../components/Input'
import TextArea from '../components/TextArea'

type InputsStateType = {
  name: string
  description: string
  image: string
  imageFile: string | Blob
  momId: number
  dadId: number
  userId: number
}

const _EditPerson: StyledFC<{
  userId: number
  persons: { count: number; rows: PersonType[] }
  setPersons: Dispatch<SetStateAction<{ count: number; rows: PersonType[] }>>
  setWarnings: Dispatch<SetStateAction<string>>
}> = ({ className, userId, persons, setPersons, setWarnings }) => {
  const { id } = useParams<{ id: string }>()
  //console.log(id)

  /*const [person, setPerson] = useState<PersonType>({
    id: 0,
    name: '',
    description: '',
    image: '',
    momId: 0,
    dadId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId,
  })*/
  //console.log(person)
  const [initialInputsState, setInitialInputsState] = useState<InputsStateType>(
    {
      name: '',
      description: '',
      image: '',
      imageFile: '',
      momId: 0,
      dadId: 0,
      userId,
    }
  )
  const [inputsState, setInputsState] =
    useState<InputsStateType>(initialInputsState)
  console.log('initialInputState', initialInputsState)
  console.log('inputsState', inputsState)
  useMemo(() => {
    setInputsState(initialInputsState)
  }, [initialInputsState])
  //const [isAnyInputChanged, setIsAnyInputChanged] = useState(false)

  useEffect(() => {
    fetchPerson(+id).then(({ name, description, image, momId, dadId }) => {
      setInitialInputsState({
        name,
        description,
        image,
        imageFile: '',
        momId,
        dadId,
        userId: +id,
      })
      //if (name !== inputsState.name) setIsAnyInputChanged(true)
      console.log(name)
    })
  }, [id])
  const history = useHistory()
  const [imageBuffer, setImageBuffer] = useState<string | ArrayBuffer>('')

  const inputs: {
    [k: string]: {
      type: string
      placeholder: string
      value?: string | number
      onChange: (e: ChangeEvent<HTMLInputElement>) => void
    }
  } = {
    name: {
      type: 'text',
      placeholder: 'name*',
      value: inputsState.name,
      onChange: (e) => {
        //console.log('nameValue:', e.target.value)
        //console.log('state:', inputsState.name)
        setInputsState({ ...inputsState, name: e.target.value })
      },
    },
    description: {
      type: 'text',
      placeholder: 'description',
      value: inputsState.description,
      onChange: (e) =>
        setInputsState({ ...inputsState, description: e.target.value }),
    },
    imageFile: {
      type: 'file',
      placeholder: 'image',
      onChange: (e) => {
        console.log('FILE!', e.target.files ? e.target.files[0] : '')
        /** IF IMG SELECTED */
        if (e.target.files && e.target.files[0]) {
          const reader = new FileReader()
          reader.onloadend = function () {
            const result = reader.result
            if (result) setImageBuffer(result)
          }
          reader.readAsDataURL(e.target.files[0])
          setInputsState({
            ...inputsState,
            imageFile: e.target.files[0],
          })
        } else {
          setInputsState({
            ...inputsState,
            imageFile: '',
          })
          setImageBuffer('')
        }

        /*setPerson({
          ...person,
          image: e.target.files ? e.target.files[0].name : '',
        })*/

        console.log('inputsState:', inputsState)
      },
    },
    momId: {
      type: 'number',
      placeholder: 'momId',
      value: inputsState.momId,
      onChange: (e) =>
        setInputsState({ ...inputsState, momId: +e.target.value }),
    },
    dadId: {
      type: 'number',
      placeholder: 'dadId',
      value: inputsState.dadId,
      onChange: (e) =>
        setInputsState({ ...inputsState, dadId: +e.target.value }),
    },
  }
  //console.log(inputsState)
  const savePerson = async () => {
    const formData = new FormData()
    formData.append('name', inputsState.name)
    formData.append('description', inputsState.description)
    formData.append('image', inputsState.imageFile)
    formData.append('momId', inputsState.momId.toString())
    formData.append('dadId', inputsState.dadId.toString())
    formData.append('userId', userId.toString())
    //console.log({ formData })
    //createDevice(formData).then((data) => onHide())
    try {
      const { name, description, image, momId, dadId, createdAt } =
        await updatePerson(formData, +id)
      //console.log({ res })
      console.log({ persons })
      const returnedUpdatedPerson = {
        id: +id,
        name,
        description,
        image,
        momId,
        dadId,
        userId,
        createdAt,
        updatedAt: new Date().toISOString(),
      }
      setPersons({
        ...persons,
        rows: [
          ...persons.rows.map((p) => {
            if (p.id === returnedUpdatedPerson.id) {
              return returnedUpdatedPerson
            }
            return p
          }),
        ],
      })
      history.goBack()
      setWarnings('')
    } catch (e) {
      console.log(e.message)
      setWarnings(e.message)
    }
    //persons.rows.filter((p) => p.id === +id)
    /*try {
            const {id} = await createPerson(formData)
            const newPerson = await fetchPerson(id)
            setPersons({
                count: persons.count + 1,
                rows: [newPerson, ...persons.rows.slice(0, LIMIT - 1)],
            })
            history.goBack()
            setWarnings('')
        } catch (e) {
            //console.log(e.message)
            setWarnings(e.message)
        }*/
  }
  //console.log('IMAGE BUFFER', imageBuffer)
  //console.log('INPUTSTATEIMAGE', inputsState.image)
  //console.log('compareObject:', initialInputsState == inputsState)
  const deletePersonHandler = async (personId: number) => {
    const { id } = await deletePerson(personId)
    //const { rows, count } = await fetchPersons(userId, LIMIT, FIRST_PAGE)
    //setPersons({ count, rows })
    const minusOnePersons = persons.rows.filter((p) => p.id !== id)

    console.log({ minusOnePersons })
    console.log({ persons })
    await fetchPersons(userId, LIMIT, FIRST_PAGE).then((res) => setPersons(res))
    history.goBack()
    //console.log({ e })
    //setDeletedId(id)
    //setPersons({ count: persons.count - 1, rows: minusOnePersons })
    //setNextPage(FIRST_PAGE)
  }
  return (
    <Page className={className}>
      <Button onClick={() => history.goBack()}>Go back</Button>
      <div>
        <hr />
      </div>
      {(imageBuffer || inputsState.image) && (
        <div
          className={'image'}
          style={{
            backgroundImage: `url(${
              imageBuffer || BASE_URL + inputsState.image
            })`,
          }}
        >
          {/*<img
            src={`${imageBuffer || BASE_URL + inputsState.image}`}
            alt={''}
          />*/}
        </div>
      )}
      <div>Person ID: {id}</div>
      {Object.keys(inputs).map((i, index) =>
        index !== 1 ? (
          <Input
            key={i}
            type={inputs[i].type}
            placeholder={inputs[i].placeholder}
            value={inputs[i].value}
            onChange={inputs[i].onChange}
          />
        ) : (
          <TextArea
            rows={7}
            key={i}
            placeholder={inputs[i].placeholder}
            value={inputs[i].value}
            onChange={
              inputs[i].onChange as unknown as (
                e: ChangeEvent<HTMLTextAreaElement>
              ) => void
            }
          />
        )
      )}
      <Button
        disabled={
          JSON.stringify(initialInputsState) === JSON.stringify(inputsState) ||
          !inputsState.name
        }
        primary
        onClick={() => savePerson()}
      >
        Save changes
      </Button>
      <Button
        danger
        className={'del'}
        //disabled={p.id === deletedId}
        onClick={() => deletePersonHandler(+id)}
      >
        Remove all data about the person from database
      </Button>
    </Page>
  )
}

const EditPerson = styled(_EditPerson)`
  .image {
    //grid-area: image;
    overflow: hidden;
    border-radius: 0;
    width: 100%;
    height: 300px;
    background-size: cover;
    background-position: center;

    /*img {
      width: 100%;
    }*/
    /*.del {
      grid-area: del;
    }*/
  }
`

export default EditPerson
