import React, {Component, Fragment} from 'react';
import {ACTUALIZAR_RESPONSABLE}         from '../../GraphQl/Mutations/Responsable';
import {Mutation,Query}                   from 'react-apollo';
import {withRouter}                 from 'react-router-dom';
import Generic                      from '../Mantenimientos/ListadeValores/Generic';
import {front}                      from '../FrontEnd/frontEnd';
import { LISTADEVALOR_QUERY } from '../../GraphQl/Querys/ListaDeValores';

const initialState = {
  Nombre:       '',
  Apellido:     '',
  Edad:         0,
  Direccion:    '',
  Dpi:          '',
  Nit:          '',
  Sexo:         '',
  Municipio:    '',
  Departamento: '',
  Estado:       '',
  ClienteId:    0,
  Hospital:     '',
  Sala:         '',
  Habitacion:   '',
  FechaIngreso: '',
  FechaSalida:  ''
};

class FormularioEdit extends Component {
  base = new front ();
  
  constructor (props) {
    super (props);
    this.state = {
      ...this.props.Cliente
    };
  }
  
  ClearState = () => {
    this.setState ({
                     ...initialState
                   });
  };
  
  UpdateState = e => {
    const {name, value} = e.target;
    this.setState ({
                     [name]: (name === 'Edad') ? Number.parseInt (value) : value
                   });
  };
  

  

  UpdateStateDep = (e) => {
		const {  value } = e.target;

		this.setState({
			depmu: value
		});
	};

	UpdateStateMun = (dep) => (e) => {
		const {  value } = e.target;

    this.setState({
			Departamento: dep,
			Municipio: value
		});
	};



  actualizarResponsable = (e, actualizarResponsable) => {
    e.preventDefault ();
    //insertamos en la base de datos
    this.base.swal2.create ('edit').then (result => {
      if (result.value){
        actualizarResponsable ().then (() => {
          this.ClearState ();
          this.base.swal2.success('edit');
        });
      }
    });
  };
  
  render () {
    const {
            id,
            Nombre,
            Apellido,
            Edad,
            Direccion,
            Dpi,
            Nit,
            Sexo,
            Municipio,
            Departamento
          } = this.state;
    
    const input = {
      id,
      Nombre,
      Apellido,
      Edad,
      Direccion,
      Dpi,
      Nit,
      Sexo,
      Municipio,
      Departamento
    };
    return (
       <Fragment>
         <Mutation mutation={ ACTUALIZAR_RESPONSABLE } variables={ {input} }
                   key={ id }
                   onCompleted={ () => this.props.refetch ().then (() => {
                     this.props.history.push ('/Responsables');
                   }) }>
           { (actualizarResponsable, {loading, error, data}) => {
             return (
                <form autoComplete="off"
                   onSubmit={ e => this.actualizarResponsable (e, actualizarResponsable) }
                >
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Nombre:</label>
                        <input
                           type="text"
                           name="Nombre"
                           className="form-control"
                           placeholder="Nombre "
                           onChange={ this.UpdateState }
                           defaultValue={ this.state.Nombre }
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Apellido:</label>
                        <input
                           type="text"
                           name="Apellido"
                           className="form-control"
                           placeholder="Apellido"
                           onChange={ this.UpdateState }
                           defaultValue={ this.state.Apellido }
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Edad:</label>
                        <input
                           type="number"
                           name="Edad"
                           className="form-control"
                           placeholder="Edad"
                           onChange={ this.UpdateState }
                           defaultValue={ this.state.Edad }
                        
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Direccion:</label>
                        <input
                           type="text"
                           name="Direccion"
                           className="form-control"
                           placeholder="Direccion"
                           onChange={ this.UpdateState }
                           defaultValue={ this.state.Direccion }
                        
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Dpi:</label>
                        <input
                           type="text"
                           name="Dpi"
                           className="form-control"
                           placeholder="Dpi "
                           onChange={ this.UpdateState }
                           defaultValue={ this.state.Dpi }
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Nit:</label>
                        <input
                           type="text"
                           name="Nit"
                           className="form-control"
                           placeholder="Nit "
                           onChange={ this.UpdateState }
                           defaultValue={ this.state.Nit }
                        
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Sexo:</label>
                        <Generic
                           id="5d956427132722445cfc2828"
                           Value={ this.state.Sexo }
                           UpdateState={ this.UpdateState }
                           Campo={ 'Sexo' }
                           NValor={ true }
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
												<div className="form-group">
													<label>Departamento:</label>
													{/* <Generic
                               UpdateStateID={this.UpdateStateID} 
                               id="5d956623a3a25d124c8da9b6"
                               Value={ this.state.Departamento }
                               UpdateState={ this.UpdateState }
                               autoComplete='off'
                               Campo={ 'Departamento' }
                               NValor={ true }
                            /> */}

													<Fragment>
														<Query
															query={LISTADEVALOR_QUERY}
															// pollInterval={ 500 }
															variables={{
																id: '5d956623a3a25d124c8da9b6'
															}}
														>
															{({
																loading,
																error,
																data,
																startPolling,
																stopPolling //para recargar el resto de la vista
															}) => {
																if (loading) return 'Cargando...';
																if (error) return `Error: ${error.message}`;

																return (
																	<Fragment>
																		<select
																			name="Departamento"
																			className="form-control"
																			onChange={this.UpdateStateDep}
																		>
																			<option
																				key={0}
																				value={0}
																				disabled
																			>
																				{'...'}
																			</option>
																			{data.getListaDeValor.Valor.map((item) => {
																				return (
																					<option
																						key={item.Nombre}
																						value={item.Valor}
																						selected={
																							this.state.Departamento ===
																							item.Nombre
																						}
																					>
																						{item.Nombre}
																					</option>
																				);
																			})}
																		</select>
																	</Fragment>
																);
															}}
														</Query>
													</Fragment>
												</div>
											</div>

                      <div className="col-md-4">
												<div className="form-group">
													<label>Municipio:</label>
													{/* <Generic
                               id="5d956427132722445cfc2828"
                               Value={ this.state.Municipio }
                               UpdateState={ this.UpdateState }
                               Campo={ 'Municipio' }
                               NValor={ true }
                            /> */}

													<Fragment>
														<Query
															query={LISTADEVALOR_QUERY}
															// pollInterval={ 500 }
															variables={{
																id: this.state.depmu
															}}
														>
															{({
																loading,
																error,
																data,
																startPolling,
																stopPolling //para recargar el resto de la vista
															}) => {
																if (loading) return 'Cargando...';
																if (error) return `Error: ${error.message}`;

																if (data.getListaDeValor) {
																	return (
																		<Fragment>
																			<select
																				name="Municipio"
																				className="form-control"
																				onChange={this.UpdateStateMun(data.getListaDeValor.Nombre)}
																			>
																				<option
																					key={0}
																					value={0}
																					disabled
                                          selected={true}
																				>
																					{'...'}
																				</option>

																				{data.getListaDeValor.Valor.map(
																					(item) => {
																						return (
																							<option
																								key={item.Nombre}
																								value={item.Nombre}
																								selected={
																									this.state.Municipio ===
																									item.Nombre
																								}
																							>
																								{item.Nombre}
																							</option>
																						);
																					}
																				)}
																			</select>
																		</Fragment>
																	);
																} else {
																	return (
																		<Fragment>
																			<select
																				name="Municipio"
																				className="form-control"
																				onChange={this.UpdateState}
																			>
																				<option
																					key={0}
																					value={0}
																					selected={true}
																					disabled
																				>
																					{this.state.Municipio}
																				</option>
																			</select>
																		</Fragment>
																	);
																}
															}}
														</Query>
													</Fragment>
												</div>
											</div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <button type="submit" className={ this.base.button.Primary+ ' float-right' }>
                        <i className={this.base.icons.save}></i>
                        { this.base.text.Guardar }
                      </button>
                    </div>
                  </div>
                </form>
             );
           } }
         </Mutation>
       </Fragment>
    );
  }
}
export default withRouter (FormularioEdit);