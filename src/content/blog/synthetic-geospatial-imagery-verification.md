---
title: "Breaking: A Tsunami Has Hit Wakanda, and Satellite Images Prove It"
description: "Synthetic geospatial imagery is becoming easier to create. Verification must become easier too."
publishedDate: 2026-07-31
tags:
  - Earth observation
  - Artificial intelligence
  - Image verification
  - Open data
featured: true
draft: false
---

No, a tsunami has not hit Wakanda.

Wakanda is fictional, and the headline above is deliberately false. But it probably caught your attention. That is precisely the point.

Many people in the Earth observation community will have seen Google's recent integration of its Nano Banana 2 image-generation model into Google Earth. The feature allowed users to select a real location and generate a new image grounded in Google Earth's satellite, aerial and 3D imagery using a simple text prompt.

The announcement received immediate and understandable criticism. Google subsequently rolled the feature back while it works on stronger safeguards. In its [announcement and subsequent update](https://blog.google/products-and-platforms/products/earth/nano-banana-google-earth-image-generation/), Google acknowledged the particular trust people place in Google Earth and reported that screenshots of generated imagery were already being shared in ways that appeared to violate its policies.

Google also clarified that generated images did not replace imagery in the public Google Earth view and were labelled and watermarked as AI-generated.

The speed of the backlash shows how seriously the geospatial community takes trust.

It should.

But I also wonder whether a purely negative reaction prevents us from asking two other important questions:

1. Could this technology also have legitimate value for Earth observation?
2. How do we make verification accessible to ordinary people, rather than expecting them to become imagery-forensics experts?

## The risk is real, but it is not entirely new

Google Earth carries an unusual level of visual authority.

People use it to explore unfamiliar places, investigate environmental change, understand news events and confirm what exists at a particular location. A screenshot that looks like Google Earth therefore inherits some of that trust, even after it has been separated from its original interface and context.

A generated image could be reposted as evidence of a flood that never happened, a wildfire at the wrong place or time, a military installation, damage to critical infrastructure or an erupting volcano.

The image does not need to fool an EO expert. It only needs to circulate faster than the correction.

At the same time, it would be inaccurate to suggest that manipulating satellite or aerial imagery suddenly became possible with this Google Earth release.

Image-editing models have been able to accept existing images and make realistic prompt-based alterations for some time. Google itself introduced [Nano Banana as an image-editing model in Gemini](https://blog.google/products-and-platforms/products/gemini/updated-image-editing-model/) in 2025, including the ability to alter specific elements while preserving much of the original image. Similar capabilities exist across several other generative-image platforms.

Anyone sufficiently motivated could already take a screenshot from Google Earth, or another mapping platform, and ask an image-generation model to add water, smoke, buildings, vehicles or destruction.

Google did not create the underlying problem.

What changed was the level of friction. Image generation was placed directly beside recognisable real-world geography in one of the world's most trusted geospatial interfaces. A person no longer needed to export an image, open another application, understand an editing workflow and carefully preserve the geographical features. They could simply select a location and describe what they wanted to see.

Both of these statements can therefore be true:

> Synthetic geospatial misinformation was already possible.

And:

> Integrating generation into Google Earth made it easier, faster and potentially more convincing.

Acknowledging the first point should not be used to dismiss the second.

## Synthetic imagery may also have scientific value

The examples in Google's announcement focused largely on historical reconstruction, real-estate planning, educational infographics and architectural visualisation. Those are legitimate uses, but they may understate the technology's potential relevance to Earth observation research.

A persistent challenge in EO machine learning is the lack of sufficient labelled examples, especially for rare events and underrepresented classes.

Consider unusual wildfire behaviour, rare crop diseases, specific landslide damage patterns, uncommon flood impacts, ecological classes or disaster-related infrastructure damage. These may be precisely the examples we most need a model to recognise, while simultaneously being the examples for which we have the least training data.

Recent research suggests that synthetic remote-sensing imagery can sometimes help.

[**SatSynth**](https://openaccess.thecvf.com/content/CVPR2024/html/Toker_SatSynth_Augmenting_Image-Mask_Pairs_through_Diffusion_Models_for_Aerial_Semantic_CVPR_2024_paper.html), presented at CVPR 2024, generated paired aerial images and segmentation masks and found that including generated samples improved downstream semantic-segmentation performance.

[**AeroGen**](https://openaccess.thecvf.com/content/CVPR2025/html/Tang_AeroGen_Enhancing_Remote_Sensing_Object_Detection_with_Diffusion-Driven_Data_Generation_CVPR_2025_paper.html), presented at CVPR 2025, used layout-controlled synthetic imagery for remote-sensing object detection and reported improvements when generated data was added to real training datasets.

More recently, [**Gen4Regen**](https://arxiv.org/abs/2605.05627) used Nano Banana Pro to create 2,101 synthetic aerial images with pixel-aligned segmentation masks for forest-regeneration mapping. Combining generated and real-world data improved performance substantially over the supervised baseline, particularly for underrepresented species.

This does not prove that images generated through the short-lived Google Earth feature would automatically make scientifically useful training data. I have not independently evaluated that question.

It does, however, show that synthetic EO imagery is not merely a novelty or a misinformation threat. Under carefully controlled conditions, it can have measurable research value.

An important distinction must nevertheless be made between:

- **Synthetic visual imagery**, which may help with some RGB computer-vision tasks
- **Synthetic sensor data**, which would need to reproduce physically meaningful spectral, radiometric, atmospheric and sensor characteristics

A generated Google Earth image may convincingly resemble a flood or burn scar in visible colour. That does not mean it accurately simulates Sentinel-2 reflectance, SAR backscatter, thermal behaviour or another sensor's measurements.

Nano Banana-generated Google Earth images belong primarily to the first category.

There are also serious quality questions. [Research involving rare objects in synthetic satellite imagery](https://arxiv.org/abs/2409.01138) has found that commonly used automated image-quality metrics do not always align with human judgements of realism.

Attractive images and impressive benchmark scores should therefore not replace validation using independent, real-world observations.

The possible benefits deserve investigation, but not uncritical adoption.

## Testing what an ordinary user can verify

The most useful public response cannot simply be:

> Be more sceptical.

That places almost the entire burden on the reader.

Most people cannot identify sensor artefacts, compare road geometry, inspect acquisition histories or distinguish a genuine very-high-resolution image from a sophisticated generated edit. Even experienced EO professionals may struggle when presented with a compressed screenshot without metadata.

Fortunately, Google did not provide only the generation capability. It also embeds [**SynthID**](https://deepmind.google/models/synthid/), an invisible watermark designed to identify content generated or edited by Google AI.

According to [Google's verification guidance](https://support.google.com/gemini/answer/16722517), users can upload an image, including a tightly cropped screenshot, to Gemini and ask whether it was created or edited using Google AI. Gemini checks for SynthID and may also inspect available Content Credentials.

When SynthID is found, it indicates that Google AI generated or edited at least part of the image.

A useful prompt is:

> **Was this image generated or edited using Google AI? Check specifically for SynthID and any available Content Credentials. Do not determine this only from visual appearance. Explain what the result proves and what it does not prove.**

The limitation is essential:

> **Not finding SynthID is not proof that an image is authentic.**

The image may have been created with another AI system. The watermark may no longer be detectable after repeated transformations. The alteration may have been too small, or the result may simply be inconclusive.

Google says SynthID is designed to remain detectable through common transformations such as cropping, filtering, resizing and lossy compression, but it is not presented as infallible.

I wanted to see how this worked with the type of screenshots that might actually circulate online.

I used four examples: an ordinary Google Earth view of Vesuvius, a generated version showing a fictional current eruption, an ordinary view of Innsbruck and a generated version showing severe fictional flooding across the city.

<div class="image-pair">
  <figure>
    <img src="/images/blog/synthetic-geospatial-imagery/vesuvius-original.webp" alt="Unmodified Google Earth screenshot showing Mount Vesuvius and the surrounding settlements" loading="lazy" />
    <figcaption><strong>Original:</strong> An unmodified Google Earth view of Vesuvius.</figcaption>
  </figure>
  <figure>
    <img src="/images/blog/synthetic-geospatial-imagery/vesuvius-synthetic-eruption.webp" alt="Synthetic test image of Mount Vesuvius showing a fictional eruption, smoke and lava" loading="lazy" />
    <figcaption><strong>Synthetic test:</strong> A fictional eruption generated for this experiment. It does not depict a real current event.</figcaption>
  </figure>
</div>

<div class="image-pair">
  <figure>
    <img src="/images/blog/synthetic-geospatial-imagery/innsbruck-original.webp" alt="Unmodified Google Earth screenshot showing Innsbruck and the Inn Valley" loading="lazy" />
    <figcaption><strong>Original:</strong> An unmodified Google Earth view of Innsbruck.</figcaption>
  </figure>
  <figure>
    <img src="/images/blog/synthetic-geospatial-imagery/innsbruck-synthetic-flood.webp" alt="Synthetic test image of Innsbruck showing fictional widespread flooding" loading="lazy" />
    <figcaption><strong>Synthetic test:</strong> A fictional flood scenario generated for this experiment. It does not depict a real flood event.</figcaption>
  </figure>
</div>

The generated examples were useful test cases, although they were not perfect. A careful viewer could identify details that looked unusual or inconsistent, particularly when comparing them with the originals.

The aim was not to demonstrate that AI-generated geospatial imagery is already indistinguishable from real imagery. It was to test whether the available verification process could identify that the images had been generated or edited.

For the Vesuvius examples, SynthID worked exactly as hoped. Gemini did not detect evidence of Google AI generation in the original screenshot, while it successfully identified SynthID in the fictional eruption image.

The Innsbruck results were less clear. Both the original screenshot and the generated flood image returned inconclusive results.

That matters.

An inconclusive result does not mean an image is false. It also does not verify it as authentic. It simply means that one line of evidence did not provide a definitive answer.

This was not an exhaustive evaluation. Four examples are nowhere near enough for accuracy statistics, and I reached the available free-use limits before testing a larger set. The objective was not to benchmark SynthID scientifically. It was to see whether an ordinary user could apply it to realistic screenshots and whether a second verification step would still be useful.

The Vesuvius test showed the value of SynthID when it works. The Innsbruck test showed why it should not be the only verification method.

## EO4AI Detector: two different questions

This led me to build a small open-source tool called [**EO4AI Detector**](https://ai4eo-detector.onrender.com/).

The workflow combines two different questions:

1. **Does the screenshot contain evidence of Google AI generation or editing?**
2. **Does independent Earth observation data support the broad geographical claim attached to it?**

The user adds the screenshot and its accompanying post or caption. The tool prepares a structured prompt for Gemini, which checks SynthID and Content Credentials and extracts possible location and date information from both the written claim and visible labels in the image.

The user then confirms the location and date before the application searches freely available Sentinel-2 imagery through Element 84 Earth Search and AWS Open Data.

<figure class="wide-figure">
  <img src="/images/blog/synthetic-geospatial-imagery/eo4ai-detector-interface.webp" alt="EO4AI Detector interface showing the first step for adding a screenshot and its related claim" loading="lazy" />
  <figcaption>The EO4AI Detector starts with the screenshot and the claim attached to it, then guides the user through provenance and independent EO checks.</figcaption>
</figure>

The [source code is openly available on GitHub](https://github.com/DonvanGrobler/AI4EO-detector).

It is deliberately an experimental prototype, not a professional fact-checking service.

## What Sentinel-2 can and cannot prove

This part requires careful explanation.

Google Earth often displays very-high-resolution imagery. Sentinel-2 provides visible imagery at a spatial resolution of up to 10 metres. The images may also differ in acquisition date, season, viewing conditions, processing and source provider.

Sentinel-2 therefore cannot authenticate every detail in a Google Earth screenshot. It cannot reliably verify individual vehicles, people, small buildings, fine structural damage or exact VHR pixels.

That is not its role in this workflow.

Instead, it can help answer a different question:

> **Does independent EO data support the broad real-world claim associated with the screenshot?**

For example:

- Is extensive flooding visible near the claimed location and date?
- Is there evidence of a major burn scar?
- Has a large forest area been cleared?
- Does a major landslide appear?
- Is a large construction site or settlement visible?
- Has a coastline, river or lake changed substantially?

This distinction is central:

> **SynthID investigates the likely origin of the image. Independent EO observations investigate whether the associated geographical claim is observable.**

Neither replaces the other.

A synthetic image could depict an event that really occurred. Conversely, an authentic screenshot could be old, mislabelled, taken from another location or attached to a false caption.

Verification therefore involves at least three separate questions:

1. Was the image generated or edited?
2. What is its actual source, location and date?
3. Does independent evidence support the claim being made with it?

The inconclusive Innsbruck SynthID results illustrate why this second line of evidence is important. Even when the image-origin check cannot provide a clear answer, independent satellite observations may still help determine whether the claimed event is visible at the stated place and time.

## Why open EO data matters

This experiment also reinforced the importance of publicly available Earth observation programmes.

Sentinel-2 cannot answer every verification question. But the ability for anyone, not only large companies or specialised government agencies, to retrieve independent observations of the planet is an important part of public information infrastructure.

In a world where realistic synthetic geography can be created in seconds, open observational data becomes more valuable, not less.

The public investment behind Copernicus and related open-data infrastructure does more than support scientific research and commercial EO services. It provides a shared, independently accessible evidence base.

That role should be recognised and protected.

## Generation and verification must develop together

EO4AI Detector is modest. It was built in one afternoon with considerable help from AI, followed by testing, corrections and deployment.

That is not meant as a claim that the verification problem has been solved.

It is an invitation.

A more mature public tool could combine multiple watermark and provenance checks, reverse-image search, signed source information, optical and radar EO observations, and clear, shareable evidence reports.

If one person can assemble a basic workflow in an afternoon, imagine what could be built by a small group of EO specialists, media-forensics researchers, journalists, open-source developers, data providers and responsible AI teams working together.

The code is open because I would rather see the idea improved collaboratively than presented as a finished product.

Try it. Break it. Test it with cropped and recompressed screenshots. Report the failures as well as the successes.

The concerns raised by the EO and OSINT communities were justified. Google itself evidently agreed that stronger safeguards were needed and rolled the feature back.

But the underlying capabilities will not disappear.

Other image-generation tools can already manipulate geospatial screenshots. Synthetic visual imagery may also contribute to research, training-data augmentation, education and scenario planning. Watermarking, provenance standards and open observational data already provide parts of a possible response.

The challenge is to connect those parts and make them understandable to the public.

We should raise awareness of the danger.

We should insist on responsible labelling, provenance and guardrails.

We should investigate constructive applications with scientific discipline.

And we should place practical verification tools into the hands of the same people who are increasingly exposed to synthetic content.

> **Generation is becoming accessible to everyone. Verification must become accessible too.**
