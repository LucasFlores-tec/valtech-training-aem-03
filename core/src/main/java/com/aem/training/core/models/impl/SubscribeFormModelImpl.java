package com.aem.training.core.models.impl;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.aem.training.core.models.SubscribeFormModel;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import lombok.Getter;

@Model(
        adaptables = { SlingHttpServletRequest.class },
        adapters = { SubscribeFormModel.class, ComponentExporter.class },
        resourceType = SubscribeFormModelImpl.RESOURCE_TYPE,
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
@Exporter(
        name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION
)
@Getter
public class SubscribeFormModelImpl implements SubscribeFormModel, ComponentExporter {

    static final String RESOURCE_TYPE = "aem-training-03/components/subscribe-form";

    @ValueMapValue
    private String title;
    @ValueMapValue
    private String label;
    @ValueMapValue
    private String authorization;

    @Override
    public String getExportedType() {
        return SubscribeFormModelImpl.RESOURCE_TYPE;
    }

}
