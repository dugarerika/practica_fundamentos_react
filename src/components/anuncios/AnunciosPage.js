import React from 'react';
import Filtro from '../anuncios/Filtro';
import { getAllAnuncios } from '../../API/anuncios';

import Anuncio from '../anuncios/Anuncio';
import Layout from '../layout/Layout';
class AnunciosPage extends React.Component {
	state = {
		anuncios: null
	};

	getAnuncios = async () => {
		const resp = await getAllAnuncios();
		console.log(resp);
		this.setState({ anuncios: resp.result.rows });
	};

	handlefilter = (generatedAnuncio) => {
		console.log(generatedAnuncio);
		this.setState({ anuncios: generatedAnuncio.result.rows });
	};

	async componentDidMount() {
		this.getAnuncios();
	}

	renderFiltro() {
		const { history } = this.props;
		return <Filtro onfilter={this.handlefilter} history={history} />;
	}

	renderContent() {
		const { history } = this.props;
		const { anuncios } = this.state;
		console.log(anuncios);
		if (!anuncios) {
			return null;
		}

		if (anuncios.length === 0) {
			return (
				<span className='mensaje'>
					No hay anuncios que cumplan con la busqueda
				</span>
			);
		}

		return anuncios.map((anuncio) => (
			<Anuncio key={anuncio._id} anuncio={anuncio} history={history} />
		));
	}

	render() {
		console.log(this.state.anuncios);
		return (
			<div>
				<Layout title='Lista de Anuncios'>
					<div className='AnunciosPage'>{this.renderFiltro()}</div>
					<div className='AnunciosPage'>{this.renderContent()}</div>
				</Layout>
			</div>
		);
	}
}

export default AnunciosPage;
