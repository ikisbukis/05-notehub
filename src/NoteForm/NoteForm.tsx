import { Modal } from "../Modal/Modal"
import css from "./NoteForm.module.css"
import { Field, Formik, Form, type FormikHelpers } from "formik"
import * as Yup from "yup";

interface NoteFormValues{
    title: string
    content: string
    tag: string
}

const InitialValues : NoteFormValues = {
    title: "",
    content: "",
    tag: "Todo"
}

const Schema = Yup.object().shape({
  title: Yup.string().required("Username is required"),
  content: Yup.string().required("Content is required"),
  tag: Yup.string().required("Tag is required")
});

interface NoteFormProps{
  handleOnForm: (isForm: boolean) => void
  onSubmit: (values: NoteFormValues) => void
}

export const NoteForm = ({handleOnForm, onSubmit} : NoteFormProps) => {

    const handleSubmit = (
        values: NoteFormValues, 
        action: FormikHelpers<NoteFormValues>
    ) => {
        onSubmit(values)
        action.resetForm() 
    }

     return (
        <Formik initialValues={InitialValues} onSubmit={handleSubmit} validationSchema={Schema}>
    <Modal>
    <Form className={css.form}>
  <div className={css.formGroup}>
    <label htmlFor="title">Title</label>
    <Field id="title" type="text" name="title" className={css.input} />
    <span id="title-error" className={css.error} />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="content">Content</label>
    <Field 
      as="textarea"
      id="content"
      name="content"
      rows={8}
      className={css.textarea}
    />
    <span id="content-error" className={css.error} />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="tag">Tag</label>
    <Field as="select" id="tag" name="tag" className={css.select}>
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
    </Field>
    <span id="tag-error" className={css.error} />
  </div>

  <div className={css.actions}>
    <button type="button" className={css.cancelButton} onClick={() => handleOnForm(false)}>
      Cancel
    </button>
    <button
      type="submit"
      className={css.submitButton}
      disabled= {false}
    >
      Create note
    </button>
  </div>
</Form>
        </Modal>
        </Formik>      
     )
}