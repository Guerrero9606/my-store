const faker = require( 'faker' );
const boom = require( '@hapi/boom' );

class categoriasServices {
	constructor() {
		this.categorias = [];
		this.generate();
	}

	generate() {
		const limit = 100;
		for ( let index = 0; index < limit; index++ ) {
			this.categorias.push( {
				id: faker.datatype.uuid(),
				categoria: faker.commerce.productAdjective(),
			} );
		}
	}

	async create( data ) {
		const newCategoria = {
			id: faker.datatype.uuid(),
			...data
		};
		this.categorias.push( newCategoria );
		return newCategoria;
	}

	async find() {
		const categoria = this.categorias;
		if ( !categoria ) {
			throw boom.notFound( 'Categoria no encontrada' );
		}
		return categoria;
	}

	findOne( id ) {
		const categoria = this.categorias.find( item => item.id === id );
		if ( !categoria ) {
			throw boom.notFound( 'Categoria no encontrada' );
		}
		return categoria;
	}

	update( id, changes ) {
		const index = this.categorias.findIndex( item => item.id === id );
		if ( index === -1 ) {
			throw boom.notFound( 'Categoria no encontrada' );
		}
		const categoria = this.categorias[ index ];
		this.categorias[ index ] = {
			...categoria,
			...changes
		};
		return this.categorias[ index ];
	}

	delete( id ) {
		const index = this.categorias.findIndex( item => item.id === id );
		if ( index === -1 ) {
			throw boom.notFound( 'Categoria no encontrada' );
		}
		this.categorias.splice( index, 1 );
		return { id };
	}
}

module.exports = categoriasServices;
