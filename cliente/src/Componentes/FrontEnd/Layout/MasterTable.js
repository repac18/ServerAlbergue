import React from "react";

class MasterTable {
	/**
	 * @typedef {{
	 *     Nombre: String,
	 *     Valor: String
	 * }} Columnas
	 */
	/**
	 *
	 * @param id
	 * @param columns
	 * @param rows
	 */
	constructor (id = 'table', columns = [], rows = []) {
		this.table='';
	if (columns.length>0 || columns!==[]){
		this.table=this.getTable(id,columns);
	}
	else{
		this.table=this.getTable(id,columns);
	}
	}
	
	/**
	 *
	 * @param columns
	 * @returns {string}
	 */
	getColumns(columns=[]){
		let col='';
		columns.forEach(item =>{
			col+=<th scope="col">{item.Nombre}</th>
		});
		return col;
	}
	
	/**
	 *
	 * @param id
	 * @param columns
	 * @returns {string}
	 */
	getTable(id='table',columns=[]){
		let table='';
		let columna=this.getColumns(columns)||'';
		
		table+=<table className={id}><thead><tr className="table-primary">{columna}</tr></thead></table>;
		return table;
	}
	
	reTable(){
		return this.table;
	}
}

export {MasterTable}