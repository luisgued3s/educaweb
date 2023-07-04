import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import educaweb from '../../assets/icons/educaWeb.png';
import openbook from '../../assets/icons/openbook.png';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#181818',
    border: '5px solid #D9BC66'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  textoCertificadoConclusao: {
    fontSize: 25,
    color: '#B3B3B3',
    marginTop: 70
  },
  textoCertificado: {
    fontSize: 15,
    color: '#B3B3B3',
    marginTop: 20
  },
  cursoTitulo: {
    fontSize: 40,
    color: 'white',
    marginTop: 30
  },
  nomeAluno: {
    fontSize: 34,
    color: 'white',
    marginTop: 50,
    fontWeight: 'bold'
  },
  retangulo: {
    objectPosition: 'right',
    top: -2,
    width: 70,
    height: 590,
    backgroundColor: '#D9BC66',
    marginRight: 40,
    border: "none"
  }
});

export function Certificado({curso, usuario}) {

return (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.section}>
        <Image src={educaweb} style={{width: 300, height: 120}}/>
        <Text style={styles.textoCertificadoConclusao}>Certificado de conclusão</Text>
        <Text style={styles.textoCertificado}>Certificamos que {usuario.displayName} concluiu o curso {curso.titulo} com carga horária de {curso.duracao}. </Text>
        <Text style={styles.cursoTitulo}>Curso: {curso.titulo}</Text>
        <Text style={styles.nomeAluno}>{usuario.displayName}</Text>
      </View>
      <View style={styles.retangulo} />
    </Page>
  </Document>
)
};