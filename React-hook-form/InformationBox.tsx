import { ApolloError } from '@apollo/client';
import { color, font } from '~styles/styles';
import Graphic, { EGraphicSize, EGraphicVariant } from '~components/visuals/Graphic';
import LoaderGraphic, {
  ELoaderGraphic,
  ELoaderGraphicSize,
} from '~components/visuals/LoaderGraphic';
import React, { useMemo } from 'react';
import clsx from 'clsx';
import styled from '@emotion/styled';

export enum EInformationBoxVariant {
  EMPTY = 'empty',
  ERROR = 'error',
  INFO = 'info',
  LOADING = 'loading',
  WARNING = 'warning',
}

export enum EInformationBoxSize {
  TINY = 'tiny',
  SMALL = 'small',
  NORMAL = 'normal',
  LARGE = 'blocker',
}

export type InformationBoxProps = {
  variant?: EInformationBoxVariant;
  graphic?: EGraphicVariant;
  actions?: React.ReactNode | React.ReactNode[];
  size?: EInformationBoxSize;
  message?: string;
  error?: Error | ApolloError;
  className?: string;
  onClick?: () => void;
};

export default function InformationBox(props: InformationBoxProps): JSX.Element {
  const {
    actions,
    variant = EInformationBoxVariant.INFO,
    message,
    error,
    graphic = EGraphicVariant.ALERT,
    size = EInformationBoxSize.NORMAL,
    className,
    onClick,
  } = props;

  const messageDisplay = message ?? error?.message ?? '';

  const graphicSize: EGraphicSize = useMemo(() => {
    switch (size) {
      case EInformationBoxSize.TINY:
        return EGraphicSize.TINY;
      default:
        return EGraphicSize.SMALL;
    }
  }, [size]);

  return (
    <InformationBoxContainer className={clsx(variant, size, className)} onClick={onClick}>
      <BoxContents className={clsx(variant, size)}>
        <StyledGraphic>
          {variant === EInformationBoxVariant.LOADING ? (
            <LoaderGraphic graphic={ELoaderGraphic.NETWORK} size={ELoaderGraphicSize.SMALL} />
          ) : (
            <Graphic variant={graphic} size={graphicSize} />
          )}
        </StyledGraphic>
        <BoxDetails className={clsx(variant)}>
          <p className="desc">{messageDisplay}</p>
          {actions ? <>{actions}</> : null}
        </BoxDetails>
      </BoxContents>
    </InformationBoxContainer>
  );
}

const BoxDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 2rem;
  &.${EInformationBoxVariant.LOADING} {
    p {
      color: ${color.grey};
      &:after {
        content: '...';
      }
    }
  }
`;

const StyledGraphic = styled.div`
  display: flex;
  justify-content: center;
`;

const BoxContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 304px;
  height: 100%;

  &.${EInformationBoxSize.TINY} {
    max-width: none;
    gap: 0.5rem;
  }
`;

const InformationBoxContainer = styled.div`
  display: flex;
  min-height: 500px;
  padding: 9.25rem 4rem 2rem 4rem;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
  flex: 1;

  p {
    margin: 0;
    font-size: ${font.size.s};
    line-height: ${font.height.m};
    text-align: center;
    white-space: pre-wrap;
    color: ${color.black};
  }

  &.${EInformationBoxVariant.EMPTY} {
    background-color: #fcfcfc;
    flex: 1;
    p {
      color: ${color.grey};
    }
  }

  &.${EInformationBoxVariant.LOADING} {
    background-color: #fcfcfc;
    flex: 1;
    p {
      color: ${color.grey};
    }
  }

  &.${EInformationBoxVariant.ERROR} {
    background-color: #fff7f8;
    p {
      color: ${color.black};
    }
  }

  &.${EInformationBoxVariant.INFO} {
    background-color: #f5f9ff;
    p {
      color: ${color.black};
    }
  }

  &.${EInformationBoxVariant.WARNING} {
    background-color: #f5f9ff;
    p {
      color: ${color.grey};
    }
  }

  &.${EInformationBoxSize.LARGE} {
    min-height: 500px;
  }

  &.${EInformationBoxSize.SMALL} {
    padding: 2.25rem 4rem 2rem 4rem;
    height: 220px;
    min-height: 220px;
  }

  &.${EInformationBoxSize.TINY} {
    padding: 1.5rem 4rem 1.5rem 4rem;
    min-height: 0;
    height: auto;
    gap: 1rem;
  }
`;
