const faker = require( 'faker' );
const boom = require( '@hapi/boom' );

class personasServices {
	constructor() {
		this.personas = [];
		this.generate();
	}

	generate() {
		const limit = 100;
		for ( let index = 0; index < limit; index++ ) {
			this.personas.push( {
				id: faker.datatype.uuid(),
				firstname: faker.name.findName(),
				lastname: faker.name.lastName(),
				type: faker.company.bsAdjective(),
			} );
		}
	}

	async create( data ) {
		const newPersona = {
			id: faker.datatype.uuid(),
			...data
		};
		this.personas.push( newPersona );
		return newPersona;
	}

	async find() {
		const persona = this.personas;
		if ( !persona ) {
			throw boom.notFound( 'Persona no encontrada' );
		}
		return persona;
	}

	async findOne( id ) {
		const persona = this.personas.find( item => item.id === id );
		if ( !persona ) {
			throw boom.notFound( 'Persona no encontrada' );
		}
		return persona;
	}

	async update( id, changes ) {
		const index = this.personas.findIndex( item => item.id === id );
		if ( index === -1 ) {
			throw boom.notFound( 'Persona no encontrada' );
		}
		const Persona = this.personas[ index ];
		this.personas[ index ] = {
			...Persona,
			...changes
		};
		return this.personas[ index ];
	}

	async delete( id ) {
		const index = this.personas.findIndex( item => item.id === id );
		if ( index === -1 ) {
			throw boom.notFound( 'Persona no encontrada' );
		}
		this.personas.splice( index, 1 );
		return { id };
	}
}

module.exports = personasServices;
