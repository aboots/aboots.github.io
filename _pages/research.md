---
layout: archive
title: ""
permalink: /research/
author_profile: true
---

## Ask in Any Modality: A Comprehensive Survey on Multimodal Retrieval-Augmented Generation

**M. M. Abootorabi, A. Zobeiri, M. Dehghani, M. Mohammadkhani, B. Mohammadi, O. Ghahroodi, M. S. Baghshah, and E. Asgari. Ask in any modality: A comprehensive survey on multimodal retrieval‑augmented generation. In the Findings of the Association for Computational Linguistics: ACL 2025, pages 16776–16809, Vienna, Austria, July 2025**

[ACL Anthology](https://aclanthology.org/2025.findings-acl.861/) &nbsp;&nbsp;&nbsp; [Github Repository](https://github.com/llm-lab-org/Multimodal-RAG-Survey) &nbsp;&nbsp;&nbsp; [Website](https://multimodalrag.github.io/)
    
A comprehensive survey on Multimodal RAG systems, covering datasets, benchmarks, metrics, evaluation, methodologies, and innovations in retrieval, fusion, augmentation, and generation. We precisely review training strategies, robustness enhancements, and loss functions, while also exploring the diverse Multimodal RAG scenarios. In addition, we outline open challenges and future directions to guide research in this evolving field.

Contributions:
- Provide a comprehensive review of the multimodal RAG field, covering task formulation, datasets, benchmarks, tasks, and domain-specific applications, evaluation, and key innovations across retrieval, fusion, augmentation, generation, training strategies, and loss functions.
- Introduce a precise, structured taxonomy that categorizes state-of-the-art models based on their primary contributions, highlighting methodological advancements and emerging frontiers.
- To support further research, we make resources, including datasets, benchmarks, and key innovations, publicly available.
- Identify current research trends and knowledge gaps, providing insights and recommendations to guide future advancements in this evolving field.

_Under the Supervision of Dr. [Ehsaneddin Asgari](https://scholar.google.com/citations?user=lIVvIFsAAAAJ&hl=en) and Prof. [Mahdieh Soleymani Baghshah](https://scholar.google.com/citations?hl=en&user=S1U0KlgAAAAJ&view_op=list_works&sortby=pubdate)_

*July. 2024 – Feb. 2025*

---
## CLASP: Contrastive Language-Speech Pretraining for Multilingual Multimodal Information Retrieval

**M. M. Abootorabi and E. Asgari. Clasp: Contrastive language‑speech pretraining for multilingual multimodal information
retrieval. In the 47th European Conference on Information Retrieval (ECIR2025), Lucca, Italy, April 2025.**

[Springer Link](https://link.springer.com/chapter/10.1007/978-3-031-88717-8_2) &nbsp;&nbsp;&nbsp; [arXiv](https://arxiv.org/abs/2412.13071v1) &nbsp;&nbsp;&nbsp; [Code](https://github.com/language-modeling-lab/CLASP) &nbsp;&nbsp;&nbsp; [Models](https://huggingface.co/llm-lab/CLASP) &nbsp;&nbsp;&nbsp; [Newly Introduced Dataset](https://huggingface.co/datasets/llm-lab/SpeechBrown) &nbsp;&nbsp;&nbsp; [ACM Digital Library](https://dl.acm.org/doi/10.1007/978-3-031-88717-8_2) &nbsp;&nbsp;&nbsp; [Website](https://clasp1.github.io/)
    
CLASP is a multilingual, multimodal representation model designed for audio-text information retrieval. It uses contrastive learning to bridge the gap between language and speech domains and is trained on a diverse speech-text dataset. The model sets new benchmarks in retrieval metrics across multiple languages. It created a shared embedding space for speech and text modalities to bypass the need for Automatic Speech Recognition (ASR) models in several tasks by following these steps:

- Introduce a new dataset: Create a new dataset, called **Speech Brown**, which is the speech version of the original [Brown corpus](https://en.wikipedia.org/wiki/Brown_Corpus) dataset by getting help from text-to-speech modern models, spanning paired aligned text-audio in 15 categories, encompassing a wide range of topics from
fiction to religion.
- Leverage Multiple Datasets: Utilize a variety of datasets to enhance the model’s generality and robustness across different data distributions.
- Use Spectrogram for More Information: This model uses a Spectrogram to provide more information. A spectrogram image of the speech is generated and passed through the EfficientNet encoder to capture more information from the speech besides the raw speech.
- Use pre-trained Models: The model utilizes pre-trained encoders - wav2vec2 for audio, EfficientNet for spectrogram images, and LaBSE for transcribed text.
- Contrastive Learning: The model employs contrastive learning using audio, image, and text modalities. The Huber loss and contrastive loss between the embeddings from these modalities are computed and minimized.
- Encoder Architectures: Two different architectures are tested for the main encoder - one with output vector concatenation and another using a complex gating algorithm similar to LSTM.
- This lightweight model sets new benchmarks in retrieval metrics and creates a shared embedding space for audio and text.

_Under the Supervision of Dr. [Ehsaneddin Asgari](https://scholar.google.com/citations?user=lIVvIFsAAAAJ&hl=en)._

*March. 2023 – Sep. 2024*

---

## Generative AI for Character Animation: A Comprehensive Survey of Techniques, Applications, and Future Directions

**M. M. Abootorabi, O. Ghahroodi, P. S. Zahraei, H. Behzadasl, A. Mirrokni, M. Salimipanah, A. Rasouli, B. Behzadipour, S. Azarnoush, B. Maleki, E. Sadraiye, K. K. Feriz, M. T. Nahad, A. Moghadasi, A. E. Abianeh, N. Nazar, H. R. Rabiee, M. S. Baghshah, M. Ahmadi, and E. Asgari. Generative AI for Character Animation: A Comprehensive Survey of Techniques, Applications, and Future Directions, May 2025**

[arXiv](https://arxiv.org/abs/2504.19056) &nbsp;&nbsp;&nbsp; [Github Repository](https://github.com/llm-lab-org/Generative-AI-for-Character-Animation-Survey)
    
As generative AI rapidly transforms animation, art, and gaming, keeping track of the swift advancements across various character components like motion, emotions, and facial expressions has become challenging. This survey offers a unified perspective on this dynamic field.

Our survey provides:
- **In-Depth Component Analysis:** We systematically examine the state-of-the-art in generative AI for core character animation aspects, including facial animation, expression rendering, image synthesis, avatar creation, gesture modeling, motion synthesis, object generation, and texture synthesis. We cover leading research, practical uses, datasets, and trends for each area.
- **Foundational Knowledge for Newcomers:** A dedicated background section introduces essential concepts, foundational models (like diffusion models, GANs, VAEs, transformers), and evaluation metrics to help new researchers and developers get started.
- **Systematic Taxonomy:** We introduce a well-defined taxonomy categorizing current models by their main contributions, highlighting key methodologies and emerging trends in AI-driven animation.
- **Future Research Roadmap:** We identify open challenges and research gaps and map out future directions to guide advancements in AI-powered character animation technologies.
- **Open Resources:** To foster research and accessibility, we've compiled and shared key resources including datasets, benchmarks, models, and evaluation tools. Check out the GitHub repository for this survey, which we plan to keep updated.

_Under the Supervision of Dr. [Ehsaneddin Asgari](https://scholar.google.com/citations?user=lIVvIFsAAAAJ&hl=en)_

*June. 2024 – May. 2025*

---

## Emotion Classification in Code‑Mixed Conversations and Multimodal Emotion Cause Pair Extraction Within Conversational Contexts

**M. M. Abootorabi, N. Ghazizadeh, S. A. Dalili, A. Ghahramani Kure, M. Dehghani, and E. Asgari. AIMA at SemEval‑2024 task 10: History‑based emotion recognition in Hindi‑English code‑mixed conversations. In Proceedings of the 18th International Workshop on Semantic Evaluation (SemEval‑2024), pages 1704–1710, Mexico City, Mexico, June 2024. Association for Computational Linguistics** &nbsp;&nbsp;&nbsp; [Paper Link](https://aclanthology.org/2024.semeval-1.244/)

**A. Ghahramani Kure, M. Dehghani, M. M. Abootorabi, N. Ghazizadeh, S. A. Dalili, and E. Asgari. AIMA at SemEval‑2024 task 3: Simple yet powerful emotion cause pair analysis. In Proceedings of the 18th International Workshop on Semantic Evaluation (SemEval‑2024), pages 1698–1703, Mexico City, Mexico, June 2024. Association for Computational Linguistics** &nbsp;&nbsp;&nbsp; [Paper Link](https://aclanthology.org/2024.semeval-1.243/)

Two papers were published by us in Proceedings of the 18th International Workshop on Semantic Evaluation (SemEval-2024). 

One of our papers suggested a novel approach for emotion recognition in code‑mixed conversations, utilizing pre‑trained large models and GRU networks to integrate both previous and future context information of the current utterance, as well as sequential information of the conversation up to that point, to recognize each utterance’s emotion.

- The paper addresses Emotion Recognition in Conversation (ERC) for Hindi-English code-mixed conversations, a challenging task due to the linguistic complexity and lack of annotated datasets.
- Developed a Hinglish-to-English translation pipeline to preprocess code-mixed data, facilitating better model performance.
- Proposed four different base models leveraging pre-trained encoders and incorporating both historical and sequential information to predict emotions accurately.
    - Simple History-Based Model: Utilizes the current and previous sentences along with the previous emotion to predict the current emotion. It employs a multi-head attention mechanism to focus on relevant parts of the current sentence based on the previous context.
    - Data Augmentation: Similar to the Simple History-Based Model but trained on an augmented dataset using a Pegasus paraphrase model to increase data size and variety
    - Full History-Based Model: Extends the Simple History-Based Model by incorporating all previous sentences in the conversation to provide more context, processed through a pre-trained encoder and a feed-forward neural network.
    - Context-Aware GRU-Based Model: Incorporates both preceding and succeeding sentences, using a Gated Recurrent Unit (GRU) to leverage sequential information and avoid error propagation by not using the previous sentence’s emotion.

Another paper focused on extracting exact emotion‑cause pairs from conversations using textual, audio, and visual cues, consisting of embedding extraction, emotion classification, and cause analysis via QA techniques.

- Extracted a causality matrix using a transformer‑based encoder, which captures complex causal relationships within dialogues.
- Incorporated Question‑Answering (QA) and Prompt Engineering techniques for precise extraction of causal text segments, enhancing the identification of emotion causes in conversations.
- Embedding Extraction: The model uses EmoBERTa for text embedding, which is fine-tuned on the task dataset to capture emotional nuances in conversational data.
- Cause-Pair Extraction & Emotion Classification: This phase involves a Transformer-based Encoder that processes embeddings and classification logits to generate a causality matrix, highlighting potential causal relationships within dialogues.
- Post-Pair-Extraction Cause Analysis: The model employs a question-answering (QA) approach using the deepset/deberta-v3-base-squad2 model to extract specific causal text segments from the conversation.

_Under the Supervision of Dr. [Ehsaneddin Asgari](https://scholar.google.com/citations?user=lIVvIFsAAAAJ&hl=en)._

*Aug. 2023 – March. 2024*

---

## Developing Automated Medical Report Generation for Fundus Fluorescein Angiography Images (A Novel Approach in Ophthalmology Research)

**Remote Research Assistant at [University of New South Wales](https://www.unsw.edu.au/) (Summer internship)**

It introduces a model that utilizes FFA-IR datasets, which comprise Fundus Fluorescein Angiography Images and their corresponding reports. We try to make the model use more medical information rather than just using language metrics for generating the report. Also, we made some changes in the RL algorithm to perform better. The model generates a report for each case based on the patient's images by following the steps below:

- A Convolutional Neural Network (CNN) serves as the Visual Extractor, extracting visual features from the medical images. We try to make it understand medical features better from images rather than just using a common CNN.
- Cross-modal Memory aligns the visual and textual features of a medical image and its report. Shared memory records the mappings between visual and textual information.
- The encoder-decoder in this model is built upon a standard Transformer with some medical components to perform better in generating medical reports. The decoder in such architectures typically takes the encoded representations of the input data and transforms them into the desired output format.
- The proposed reinforcement learning (RL) algorithm is a bit modified and applied to leverage the signals from natural language generation (NLG) metrics, such as BLEU to guide the cross-modal mappings so as to better match features from images and texts as well as have a direct target of learning outcome for report generation. (This section is a work in progress)

_Under the Supervision of Dr. [Imran Razzak](https://scholar.google.com/citations?user=GlXI4N8AAAAJ&hl=en) and Dr. [Usman Naseem](https://scholar.google.com/citations?user=61Ou1P8AAAAJ&hl=en)_

*June. 2023 – Sep. 2023 (Summer internship)*

---

## Developing Models & Pipelines For Text Localization In English & Persian

This research involves the development of a multimodal model that uses Contrastive Learning and other paradigms to encode texts and audio into a shared embedding space, enhancing the efficiency of text localization in audio streams across various applications. It finds relevant parts of the long speech related to the query.

- A Persian dataset is created for ASR(Automatic Speech Recognition) and other similar tasks based on [Radiomarz](https://radiomarz.libsyn.com/) podcasts. This dataset contains more than 70 hours of podcast audio with their transcripts as well. you can read more about this dataset [here](https://drive.google.com/file/d/1-09cAm0_UsWSQqazYWYhEUIX6B963V5N/view?usp=sharing)
- Create a web demo UI for the Audio Text Localization in Persian and English.
- Audio files are then segmented into smaller chunks using a silence detection technique. For Persian language data, transcripts are extracted using a custom ASR model. Keywords are extracted from these transcripts using various methods like PKE, BERT-based Language Model, YAKE algorithm, Multi-RAKE algorithm, and a fine-tuned Persian Summarizer.
- The baseline model determines the similarity between the keywords of a text query and the keywords extracted from audio segments, subsequently retrieving the audio segments that are most relevant based on this similarity. The Persian ASR model is fine-tuned for this purpose.
- Proposed Model trained using Unsupervised Contrastive Learning (other types of training are also tried), this model encodes text and audio into a shared space, returning a similarity score between a text query and audio chunks.

_Under the Supervision of Dr. [Ehsaneddin Asgari](https://scholar.google.com/citations?user=lIVvIFsAAAAJ&hl=en)._

*Jan. 2023 – March 2023*
