import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';

import Label from '../forms/Label'
import Input from '../forms/Input'
import Select from '../forms/Select'
import Modal from './Modal'
import Button from '../Button'

import ModalAlert from './ModalAlert';
import AlertMsg from '../AlertMsg';

import clientAxios from '../../config/clientAxios'

export default function ModalOperatori({ open, setOpen, getRow, datiForm, setDatiForm, titleModal}) {

    const { register , handleSubmit, formState: { errors }, reset, setValue } = useForm();

    const handleOnSubmit = async (dati) => {

        console.log(dati);

        setDatiAlert({
            title: "clicked",
            open: true,
        });

        const { data } = await clientAxios.post('clienti', dati)
        console.log(data)

        return;

        if( dati.uuid_utente == '' ){
            const { data } = await clientAxios.post('clienti', dati)
            console.log(data)

            if(data.id_utente){
          
                setDatiAlert({
                    title: "Utente inserito correttamente",
                    open: true,
                });
                getRow();
                setOpen(false);
                reset();
            }
        }else{

            const { data } = await clienteTokenAxios.put(`utenti/${dati.uuid_utente}`, dati)
            console.log(data)
    
            if(data.ok){
                setDatiForm({})
                setDatiAlert({
                    title: "Utente modificato correttamente",
                    open: true,
                });
                getRow();
                setOpen(false);
                reset();
            }
        }

    }

    const initialDatiAlert = {
        title: 'Messaggio',
        open: false,
    }

    const [ datiAlert, setDatiAlert ] = useState(initialDatiAlert)

    useEffect(() => {

      if(datiForm == {}){
        return;
      }
    //   setValue('uuid_utente', datiForm.uuid_utente)
    //   setValue('email', datiForm.email)
    //   setValue('utente', datiForm.utente)
    //   setValue('tipo_utente', datiForm.tipo_utente)
      
    }, [datiForm])
    

  return (
    <>

        <ModalAlert
              title={datiAlert.title}
              cancelText="Chiudi"
              typeIcona="warning"
              denyText="Deny Button"
              onDeny={ () => console.log('Deny')}
              confirmText="Confirm Button"
              onConfirm={ () => console.log('Deny')}
              buttonVariantConfirm="primary"
              buttonVariantClose="yellow"
              buttonVariantDeny="blue"

              onClose={() => setDatiAlert({...datiAlert, open:false})}
              w="l"
              open={datiAlert.open}
        />
        <Modal title={titleModal} w="xl" open={open} setOpen={setOpen} classHeader="bg-emerald-600" >
            <form onSubmit={handleSubmit(handleOnSubmit)} className="m-4 pt-1">

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

                    <input type="hidden"
                         {...register("uuid_utente")}
                    />

                    <div className="sm:col-span-6">
                        
                        <Label htmlFor="utente" text="Utente" />
                        <input
                            type="text"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                            {...register("utente", { required: true })}
                        />
                        {errors.utente?.type === 'required' && <AlertMsg variant="danger"> Questo campo è obbligatorio </AlertMsg>}
                    </div>

                    <div className="sm:col-span-6">

                        <Label htmlFor="email" text="Email" />
                        <Input type="email"
                            {...register("email", { required: "Questo campo è obbligatorio",
                            pattern: {
                                value : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                message: `Rispetta il formato dell'email email@email.it`
                            } })}
                        />
                        {errors.email && <AlertMsg variant="danger"> {errors.email?.message} </AlertMsg> }
                    </div>

                    <div className="sm:col-span-6">
                            <Label htmlFor="tipo_utente" text="Profilo" />
                            <Select
                                {...register("tipo_utente", { required: "Questo campo è obbligatorio"})}
                            >
                                <option value="ADMIN">Admin</option>
                                <option value="SALA">Sala</option>
                                <option value="UTENTE">Utente</option>
                            </Select>
                    </div>

                </div>

                <div className="flex justify-end mt-5 mx-3">

                    <Button type="button"
                        variant="yellow"
                        text="Annulla"
                       
                        onClick={() => setOpen(false)}
                    />

                    <Button type="submit"
                        variant="red"
                        text="Salva"
                    />
                </div>

            </form>

        </Modal>
    </>
  )
}
